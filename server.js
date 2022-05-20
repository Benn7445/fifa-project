require("./backend/configs/db"); // De Mysql connection die wordt aangemaakt bij het runnen van het project.

const app = require("express")();

/**
 * Cors is de middleware dat wordt gebruikt bij ons project. Hierbij kunnen we zelf bepalen welke origins onze request kunnen gebruiken.
 * Dus niet alleen wanneer ze dezelfde ports hebben.
 */
const cors = require("cors");
app.use(cors());

/**
 * Dit zorgt ervoor dat json kan worden uitgelezen in de body van de requests.
 */
const bodyParser = require("express").json;
app.use(bodyParser());

/**
 * Dit zorgt ervoor dat de post request van de user js worden aangemaakt. 
 */
const UserRouter = require("./backend/api/user");
app.use("/user", UserRouter);

/**
 * Laat de app runnen op de port 3000.
 */
//heroku poort instellingen
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => {
  console.log("Fifa-Project-Backend server running..");
});
