<?php

    ini_set('display_errors', 1);
    header("Access-Control-Allow-Origin: *");
    header("Content-type: application/json; charset=utf-8");
    header("Access-Control-Allow-Methods:POST");
    header("Access-Control-Allow-Headers:Access-Control-Allow-Origin,Content-type: application/json; charset=utf-8,Access-Control-Allow-Methods,Authorization,X-Requested-With");

    $data = json_decode(file_get_contents("php://input"));
    $destination = $data->destination;
    $price = $data->price;
    $description = $data->description;
    $image = $data->image;
    $check = $tr->add($destination,$price,$description,$image);
    if($check){
        echo 'added successfully';
    }else{
        echo 'not added';
    }
?>