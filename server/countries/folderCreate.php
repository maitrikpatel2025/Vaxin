<?php 
	set_time_limit(10000);
	//https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json
	$str = file_get_contents('countries+states+cities.json');
	$json = json_decode($str, true);
	$i=0;
	foreach ($json as $key => $value) {
		$countrList=$json[$key]['name'];
		if(!file_exists($countrList)){
			 mkdir($countrList, 0777, true);
		}
		$states=$json[$key]['states'];
		for($i=0; $i < count($states); $i++) { 
			$states_location=__DIR__.'/'.$countrList.'/'.$states[$i]['name'].".txt";
			if(!is_file($states_location)){
			    file_put_contents($states_location, '');
			}
			$citiesList=$states[$i]['cities'];
			for ($j=0; $j <count($citiesList); $j++) { 
				$fp=fopen($states_location, 'a');  
				fwrite($fp,$citiesList[$j]['name'].PHP_EOL);  
				fclose($fp);	
			}
		}
	}
?>