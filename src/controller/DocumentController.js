const puppeteer = require("puppeteer")
const fs = require("fs")
const path = require("path")
const { logo } = require("../constants/logoB64")
const { formatValue, formatDate } = require("../utils/formatsjs")
const { env } = require('node:process')
const QuoteModel = require("../model/QuoteModel")
const { mongoose } = require('../config/database')
const { GridFSBucket } = require('mongodb');
const { execSync } = require("node:child_process")

class DocumentController {
    async generatePDF(req, res) {
        const {
            number,
            deliveryDate,
            createdAt,
            updatedAt,
            client,
            productList, productsValue, materialsCost,
            serviceList, servicesValue, partnerServicesCost,
            deliveryRate,
            urgencyRate,
            discount,
            totalWithRate
        } = req.body;

        let htmlContent = `<html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Orçamento ${number}</title>
            <style>
                /* Seu estilo permanece o mesmo */
            </style>
        </head>
        <body>
        
            <div class="header">
                <img src=${logo} alt="Logo Stylus Encadernadora" title="Stylus Encadernadora">
                <div class="header-info">
                    <div><strong>Orçamento:</strong> ${number}</div>
                    <div><strong>Data do Orçamento:</strong> ${formatDate(new Date(updatedAt).getFullYear() < 2000 ? createdAt : updatedAt)}</div>
                    <div><strong>Data de Entrega:</strong> ${formatDate(deliveryDate)}</div>
                </div>
            </div>
        
            <!-- Dados do Cliente -->
            <div class="section">
                <div class="section-header">Dados do Cliente</div>
                <div class="section-content">
                    <div class="info">
                        <div><strong>Nome:</strong> ${client.name}</div>
                    </div>
                    <div class="info">
                        <div><strong>${client.type === 'PJ' ? 'CNPJ' : 'CPF'}:</strong> ${client.document}</div>
                    </div>
                    <div class="info">
                        <div><strong>Celular:</strong> ${client.cellphone?.length > 0 ? client.cellphone : '-'}</div>
                        <div><strong>Telefone:</strong> ${client.telephone?.length > 0 ? client.telephone : '-'}</div>
                    </div>
                    <div class="info">
                        <div><strong>E-mail:</strong> ${client.email?.length > 0 ? client.email : '-'}</div>
                    </div>
                    <div class="info">
                        <div><strong>Endereço:</strong> ${client.street}, ${client.number} ${client.complement?.length > 0 ? `- ${client.complement}` : ''} - ${client.district} ${client.city}/${client.state}</div>
                    </div>
                </div>
            </div>
        
            <!-- Produtos -->
            ${productList?.length > 0 ? (
                `<div class="section">
                    <div class="section-content">
                        <table class="table">
                            <tr><th>Produto</th><th>Quantidade</th></tr>
                            ${productList?.map(product =>
                    `<tr><td>${product.product}</td><td>${product.quantity}</td></tr>`).join('')}      
                        </table>
                        <h4 class="subTotal"> SubTotal: ${formatValue(productsValue + materialsCost)}</h4>
                    </div>
                </div>`
            ) : ''}
    
            <!-- Serviços -->
            ${serviceList?.length > 0 ? (
                `<div class="section">
                    <div class="section-content">
                        <table class="table">
                            <tr><th>Serviços</th><th>Quantidade</th></tr>
                            ${serviceList?.map(service =>
                    `<tr><td>${service.product}</td><td>${service.quantity}</td></tr>`).join('')}      
                        </table>
                        <h4 class="subTotal"> SubTotal: ${formatValue(servicesValue + partnerServicesCost)}</h4>
                    </div>
                </div>`
            ) : ''}
    
            <!-- Taxas e Descontos -->
            <div class="section">
                <div class="section-header">Taxas e Descontos</div>
                <div class="section-content">
                    <div class="info">
                        <div><strong>Frete / Entrega:</strong> ${formatValue(deliveryRate)}</div>
                    </div>
                    <div class="info">
                        <div><strong>Taxa de Urgência:</strong> ${urgencyRate * 100}%</div>
                    </div>
                    <div class="info">
                        <div><strong>Desconto:</strong> ${discount * 100}%</div>
                    </div>
                </div>
            </div>
        
            <div class="lucro">Valor Total do Orçamento: ${formatValue(totalWithRate)}</div>
        
        </body>
        </html>`;

        // Verifica se o ambiente já tem o Chromium instalado
        execSync('rm -rf /opt/render/.cache/puppeteer');

        const browserConfig = !env.URLBASE?.includes('stylus') ? {} :
            {
                executablePath: '/usr/bin/chromium-browser', // Caminho do Chromium, conforme verificado acima
                args: ['--no-sandbox', '--disable-setuid-sandbox', '--headless'] // Flags necessárias
            };

        const browser = await puppeteer.launch(browserConfig); // Usa o Chromium padrão do Puppeteer

        const page = await browser.newPage();
        await page.setContent(htmlContent);

        // Gerar o PDF em memória
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
        });

        await browser.close();

        // Nome do arquivo
        const docName = `Orçamento_${number}.pdf`;

        // Armazenar o PDF no GridFS
        const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'pdfs' });
        const writeStream = bucket.openUploadStream(
            docName,
            { metadata: { id: number } }
        );

        writeStream.end(pdfBuffer);

        // Aguardar o evento de conclusão para pegar o fileId
        writeStream.on('finish', async () => {
            // Atualiza o orçamento com o link para o PDF
            const url = `${env.URLBASE}/document/download/${number}`;
            let body = {
                ...req.body,
                budgetLink: url,
                budgetDocId: number,
                __v: 0
            };

            await QuoteModel.findOneAndUpdate({ number: number }, body, { new: true });

            return res.status(200).json({
                url: url,
                docId: number,
                msg: `Orçamento ${number} gerado com sucesso`
            });
        });

        writeStream.on('error', (err) => {
            console.error('Erro ao armazenar PDF: ', err);
            return res.status(500).json({ msg: 'Erro ao gerar orçamento' });
        });
    }


    async downloadPDF(req, res) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ msg: 'Número do orçamento não fornecido.' });
        }

        try {
            const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'pdfs' });
            const file = await bucket.find({ 'metadata.id': id }).toArray();

            if (!file || file.length === 0) {
                return res.status(404).json({ msg: 'Arquivo não encontrado.' });
            }

            const fileId = file[0]._id;  // Pega o ID do arquivo

            // Cria o fluxo de leitura do GridFS
            const downloadStream = bucket.openDownloadStream(fileId);

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=Orçamento_${id}.pdf`);

            // Pipe do downloadStream para a resposta
            downloadStream.pipe(res);

            // Quando o fluxo terminar, o processo de download estará completo
            downloadStream.on('end', () => {
                console.log(`Download do PDF ${id} concluído.`);
            });

        } catch (err) {
            console.error('Erro ao buscar o arquivo:', err);
            return res.status(500).json({ msg: 'Erro ao realizar o download do arquivo.' });
        }
    }
}

module.exports = new DocumentController()