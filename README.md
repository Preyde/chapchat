# chapchat

Das Projekt ist in Typescript geschrieben und nutzt die Laufzeitumgebung Deno, welches von dem selben Macher von NodeJS ist.

Um ein Deno Projekt auszuführen muss die Laufzeitumgebung gedownloaded werden. Wie das funktioniert, wird ausführlich im Deno Einführungsleitfaden erklärt.

https://deno.land/manual/getting_started/installation

Funktion:

- Anmeldung am Server mit dem CHAP-Authentifizierungsverfahren
- Gruppenchat über die Konsole mit mehreren Clients im lokalen Netzwerk

Verwendung:



CHAP_SERVER: Nach Ausführen der mod.ts Datei ist sonst nichts zu beachten. Bei erfolgreichem Start kommt in der Konsole eine Info Nachricht, mit dem verwendeten Port.

CHAP_CLIENT: Nach Ausführen der mod.ts Datei wird nach der IP-Adresse und des Ports des Servers gefragt. Wurde der Server gefunden, wird nach dem Anmeldenamen, sowie des Passwortes gefragt. Wurde er nicht gefunden, kommt eine Fehlermeldung. 

Die Anmeldung erfolgt über vorgegebene User. Diese sind in einer lokalen SQLITE-Datenbank gespeichert. Folgende User sind:

Name: Test, Passwort: xxx;
Name: Test2, Passwort: xxx

Nach erfolgreicher Eingabe der Anmeldedaten kommt eine Benachrichtigung: "Anmeldung erfolgreich". Ist dies geschehen, kann mit anderen angemeldeten Personen geschrieben werden.
