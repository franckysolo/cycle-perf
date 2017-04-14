<?php
/**
 * Service météo locale avec weather.com sans authentification
 * @var string
 */
header("Access-Control-Allow-Origin: http://www.cycle-perf.local");
header('Content-Type', 'application/json');
// FRXX0016 = forecast station in France (0016 Merignac)
$url = 'http://wxdata.weather.com/wxdata/weather/local/FRXX0016?dayf=5&locale=fr_FR&cc=*';
$ch = curl_init();
// configuration des options
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1) ;
// exécution de la session
$result = curl_exec($ch);
// fermeture des ressources
curl_close($ch);
// transformation
$xml = simplexml_load_string($result);
$json = json_encode($xml);
print($json);
exit;
