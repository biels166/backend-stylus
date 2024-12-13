const { MailerSend, Recipient, EmailParams, Sender, Inbound, InboundFilterType } = require("mailersend");
const { env } = require("node:process");

class SendMailController {
    async sendTestMail(req, res) {
        try {
            const mailersend = new MailerSend({
                apiKey: env.SCRT_SENDMAIL,

            })

            const sentFrom = new Sender("contato@stylusencadernadora.com.br", "Renato Ávila");

            const recipients = [
                new Recipient("contato@stylusencadernadora.com.br", "Gabriel Ávila")
            ]
            /*
                        const cc = [
                            new Recipient("gabriel.avila@squadra.com.br", "Gabriel Ávila")
                        ]
            
                        const bcc = [
                            new Recipient("gabriel.avila@squadra.com.br", "Gabriel Ávila")
                        ]
            */
            const emailParams = new EmailParams()
                .setSendAt(Date.now())
                .setFrom(sentFrom)
                .setTo(recipients)
                // .setCc(cc)
                // .setBcc(bcc)
                .setSubject("This is a Subject")
                .setHtml("<strong>This is the HTML content</strong>")
                .setText("This is the text content");

            await mailersend.email.send(emailParams);

            res.status(200).send("E-mail enviado com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar o e-mail:", error);
            res.status(500).send("Erro ao enviar o e-mail.");
        }
    }

    async createInbound(req, res) {
        try {
        const mailerSend = new MailerSend({
            apiKey: env.SCRT_SENDMAIL,
        });

        const inbound = new Inbound()
            .setDomainId('yxj6lj9x1114do2r')
            .setName('trial-0p7kx4xjz8vl9yjr.mlsender.net')
            .setDomainEnabled(true)
            .setMatchFilter({
                type: InboundFilterType.MATCH_ALL,
            })
       /*     .setForwards([
                {
                    type: "webhook",
                    value: "https://www.yourdomain.com/hook"
                }
            ])*/

        mailerSend.email.inbound.create(inbound)
            .then((response) => console.log(response.body))
            .catch((error) => console.log(error.body));
        }
        catch (error) {
            console.error("Erro ao vincular o e-mail:", error);
            res.status(500).send("Erro ao vincular o e-mail.");
        }
    }
}

module.exports = new SendMailController();
