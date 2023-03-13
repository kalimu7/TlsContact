<?php

    

    require_once '../app/core/Controller.php';

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: GET , POST , PUT , DELETE');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-Width');

    //traitement data
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
        return true;
    }

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
                'Lastname' => $Lastname,
                //dateofbirth`, `nationality`, `family status`, `address`, `visatype`,`Dateofdeparture`, `Date of arrival`, `traveldocumenttype`, `traveldocumentnumber`, `Referencenumber
                'dateofbirth'=>$dateofbirth,
                'family status'=>$familystatus,
                'address'=>$address,
                'visatype'=>$visatype,
                'Dateofdeparture'=>$Dateofdeparture,
                'Date of arrival'=>$Dateofarrival,
                'traveldocumenttype'=>$traveldocumenttype,
                'traveldocumentnumber'=>$traveldocumentnumber,
                'Referencenumber'=>$Referencenumber
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
        // die( print_r($_POST));
    ini_set('display_errors', 1);
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: GET , POST , PUT , DELETE');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-Width');

    //traitement data
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
        return true;
    }
    
        
        $data = json_decode(file_get_contents("php://input"));
        $Firstname = $data->Firstname;
        $Lastname = $data->Lastname;
        $Dobirth = $data->Dobirth;
        $Nationality = $data->Nationality;
        $Fstatus = $data->Fstatus;
        $Address = $data->Address;
        $Vtype = $data->Vtype;
        $Dodeparture = $data->Dodeparture;
        $Doarrival = $data->Doarrival;
        $Tdtype = $data->Tdtype;
        $Tdnumber = $data->Tdnumber;
        
        $model = $this->model('Users');
        // *******fetch data**********
        
        if(empty($Firstname) || empty($Lastname) ||empty($Dobirth) ||empty($Nationality)  ){
            echo json_encode(array("message" => 'please fill out all the inputs'));

        }
        elseif($model->create($Firstname,$Lastname,$Dobirth,$Nationality,$Fstatus,$Address,$Vtype,$Dodeparture,$Doarrival,$Tdtype,$Tdnumber)){
            $idm = $model->getmax();
            $id = $idm;
            $ref = $model->fetchrefid($id);
            echo $ref;
        }else{
            echo 'failed';
        }

    }
    
    public function update(){
        ini_set('display_errors', 1);
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Methods: GET , POST , PUT , DELETE');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-Width');
    
        //traitement data
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        }
        if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
            return true;
        }
    $data = json_decode(file_get_contents("php://input"));
    $ref = $data->ref;
    $model = $this->model('Users');
    $row = $model->readonly($ref);
    extract($row);
    $travel_items = array(
                'id' => $id,
                'Firstname' => $Firstname,
                'Lastname' => $Lastname,
                //dateofbirth`, `nationality`, `family status`, `address`, `visatype`,`Dateofdeparture`, `Date of arrival`, `traveldocumenttype`, `traveldocumentnumber`, `Referencenumber
                'dateofbirth'=>$dateofbirth,
                'family status'=>$familystatus,
                'address'=>$address,
                'visatype'=>$visatype,
                'Dateofdeparture'=>$Dateofdeparture,
                'Date of arrival'=>$Dateofarrival,
                'traveldocumenttype'=>$traveldocumenttype,
                'traveldocumentnumber'=>$traveldocumentnumber,
                'Referencenumber'=>$Referencenumber
            );
    print_r(json_encode($travel_items));
   

    die;
    $Firstname = $data->Firstname;
    $Lastname = $data->Lastname;
    $id = $data->id;
    if($model->modifier($Firstname,$Lastname,$id) ){
        echo 'updated successfully';
    }

    }
    // **********real update************
    public function modi(){
        ini_set('display_errors', 1);
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Methods: GET , POST , PUT , DELETE');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-Width');
    
        //traitement data
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        }
        if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
            return true;
        }
        $data = json_decode(file_get_contents("php://input"));
        $id = $data->id;
        $Firstname = $data->Firstname;
        $Lastname = $data->Lastname;

        
        
        $model = $this->model('Users');
        if($model->modifier($Firstname,$Lastname,$id) ){
            echo 'updated successfully';
        }else{
            echo 'not updated';
        }

    }
    // **********real update************

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
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: GET , POST , PUT , DELETE');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-Width');

    //traitement data
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
        return true;
    }
        $data = json_decode(file_get_contents("php://input"));
        $Day = $data->Day;
        $Minit = $data->Minit;
        $idU = $data->idU;
        $model = $this->model('Users');
        
        
        $check = $model->book($Day,$Minit,$idU);
        if($check == 1){
            echo 'added successfully';
        }
                
        }
        public function login(){
            ini_set('display_errors', 1);
            header('Access-Control-Allow-Origin: *');
            header('Content-Type: application/json');
            header('Access-Control-Allow-Methods: GET , POST , PUT , DELETE');
            header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-Width');

            //traitement data
            if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
                if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
                if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                    header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
            }
            if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
                return true;
            }
            $data = json_decode(file_get_contents("php://input"));
            $refe = $data->reference;
            $model = $this->model('Users');
            $check = $model->readonly($refe);
            if(!$check){
                echo json_encode(array("warn" => 'there is no user with this reference email'));
            }else{
                // print_r($check);
                echo json_encode(['success' => true, 'Firstname' => $check['Firstname'],'id'=>$check['id']]);


            }

        }
        public function dates(){
        $model = $this->model('Users');
        $data = json_decode(file_get_contents("php://input"));
        $dateday = $data->day;
        $result = $model->alldates($dateday);
        $num = $result->rowCount();
        if($num > 0){
        $travel_arr = array();
        $travel_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $travel_items = array(
                'time' => $time,
            );
            array_push($travel_arr['data'],$travel_items);

        }
        echo json_encode($travel_arr);
        }else{
            echo json_encode(array("warn" => 'there is no user with this reference email'));
        }
           
    }
    public function checkRese(){
        $data = json_decode(file_get_contents("php://input"));
        $iduser = $data->idU;
        $model = $this->model('Users');
        $datachek = $model->checkReserve($iduser);
        if(empty($datachek)){
            echo json_encode([ 'alreadyreserved' => false, 'warning' => 'empty' ]);
            exit;
        }
        echo json_encode(['alreadyreserved' => true, 'time' => $datachek['time'],'datedereservation'=>$datachek['datedereservation']]);
    }
    public function book(){

    }


}

?>