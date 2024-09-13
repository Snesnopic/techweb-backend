# Web Technologies Course Project
Si vuole realizzare SMARTQUIZ, un servizio online che permette di creare quiz a risposta multipla e/o
aperta personalizzati e raccogliere le risposte di utenti sul web. Il sistema permette a un utente,
previa autenticazione, di creare un nuovo quiz, caratterizzato da un titolo e da una descrizione. È
richiesta la possibilità di inserire testo formattato nella descrizione di un quiz, specificando
eventualmente la presenza di parti di testo in corsivo, in grassetto, o link ipertestuali (per esempio,
utilizzando un linguaggio di annotazione come Markdown).
Dopo aver creato un quiz, l’utente può aggiungervi quesiti. I quesiti possono essere a risposta
multipla oppure libera. I quesiti a risposta multipla hanno 4 possibili risposte, delle quali
esattamente una deve essere corretta. I quiz a risposta aperta hanno un campo testuale e un’unica
stringa che rappresenta la risposta corretta. L’utente può anche specificare il numero massimo di
errori permessi in un quiz. Dopo aver creato un quiz, l’utente può, tramite un’apposita funzionalità,
visualizzare un link al quiz (eventualmente un QR code), che potrà condividere con gli utenti target
per cui il quiz è stato realizzato.
Cliccando sul link a un quiz, un utente (non necessariamente autenticato) visualizzerà titolo,
descrizione, e l’elenco delle domande del quiz e potrà quindi rispondere. In questa fase, l’utente
avrà anche la possibilità di specificare il proprio nome. Quando ha completato il quiz, l’utente può
inviare le proprie risposte. L’utente che ha creato il quiz visualizza, nella pagina di dettaglio di un
quiz, il nome delle persone che l’hanno completato, il loro punteggio, e il fatto che abbiano superato
il test oppure no. Nel caso in cui l’utente non specifichi il proprio nome, il sistema mostrerà quella
risposta come appartenente all’utente “Anonymous”.

# Main technologies
1. Node.JS (Environment)
2. Sequelize (Back-end database service, with mysql dialect)
3. Express (Back-end endpoint exposure)
4. Angular (Front-end framework)
5. Marked (Front-end HTML and Markdown parser)
All packages used are in the package.json file.

# How to use
Install [MySQL server](https://dev.mysql.com/doc/refman/8.4/en/installing.html)
Run:
```bash
mysql -u root -p
```
Then
```mysql
CREATE USER 'smartquiz_dbuser'@'localhost' IDENTIFIED BY 'lupin';
GRANT ALL PRIVILEGES ON * . * TO 'smartquiz_dbuser'@'localhost';
FLUSH PRIVILEGES;
CREATE DATABASE 'smartquiz';
exit
```
Clone or download back-end repository
```bash
cd techweb-backend
npm install
npm run dev
```
