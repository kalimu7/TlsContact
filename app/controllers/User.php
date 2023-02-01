<?php

    require_once '../app/core/Controller.php';
    class user extends Controller{
        public function read(){
            
        ini_set('display_errors', 1);
        header("Access-Control-Allow-Origin: *");
        header("Content-type: application/json; charset=utf-8");

        $model = $this->model('Users');
        $result = $model->fetch();
        // die(print('hhh'));
        $num = $result->rowCount();
        if($num > 0){
        $travel_arr = array();
        $travel_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $travel_items = array(
                'id' => $id,
                'Firstname' => $Firstname,
                'Lastname' => $Lastname
            );
            array_push($travel_arr['data'],$travel_items);

        }

        echo json_encode($travel_arr);

        }else{
            echo json_encode(
                array('message' => 'No destination Found')
            );
        }

    }

    public function add(){
        ini_set('display_errors', 1);
        header("Access-Control-Allow-Origin: *");
        header("Content-type: application/json; charset=utf-8");
        header("Access-Control-Allow-Methods:POST");
        header("Access-Control-Allow-Headers:Access-Control-Allow-Origin,Content-type: application/json;    charset=utf-8,Access-Control-Allow-Methods,Authorization,X-Requested-With");
        
        $data = json_decode(file_get_contents("php://input"));
        $Firstname = $data->Firstname;
        $Lastname = $data->Lastname;
        $model = $this->model('Users');
        if($model->create($Firstname,$Lastname) ){
            echo 'added successfully';
        }

    }
    
    public function update(){
    ini_set('display_errors', 1);
    // die(print('hgbk'));
    header("Access-Control-Allow-Origin: *");
    header("Content-type: application/json; charset=utf-8");
    header("Access-Control-Allow-Methods:PUT");
    header("Access-Control-Allow-Headers:Access-Control-Allow-Origin,Content-type: application/json;    charset=utf-8,Access-Control-Allow-Methods,Authorization,X-Requested-With");
    $data = json_decode(file_get_contents("php://input"));
    $Firstname = $data->Firstname;
    $Lastname = $data->Lastname;
    $id = $data->id;
    $model = $this->model('Users');
    if($model->modifier($Firstname,$Lastname,$id) ){
        echo 'updated successfully';
    }

    }
    public function remove(){
        ini_set('display_errors', 1);
        // die(print('hgbk'));
        header("Access-Control-Allow-Origin: *");
        header("Content-type: application/json; charset=utf-8");
        header("Access-Control-Allow-Methods:PUT");
        header("Access-Control-Allow-Headers:Access-Control-Allow-Origin,Content-type: application/json;    charset=utf-8,Access-Control-Allow-Methods,Authorization,X-Requested-With");
        $data = json_decode(file_get_contents("php://input"));
        $id = $data->id;
        $model = $this->model('Users');
        if($model->delete($id)){
            echo 'deleted successfully';
        }
    }
    public function reserver(){
        ini_set('display_errors', 1);
        header("Access-Control-Allow-Origin: *");
        header("Content-type: application/json; charset=utf-8");
        header("Access-Control-Allow-Methods:POST");
        header("Access-Control-Allow-Headers:Access-Control-Allow-Origin,Content-type: application/json;    charset=utf-8,Access-Control-Allow-Methods,Authorization,X-Requested-With");
        $data = json_decode(file_get_contents("php://input"));
        $id = $data->id;
        $ddr = $data->ddr;
        $model = $this->model('Users');
        if($model->book($ddr,$id) == 1){
            echo 'booked successfully';
        }else{
            echo 'you cant do the booking';
        }
    }


    }

?>