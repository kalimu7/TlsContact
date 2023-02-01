<?php
    class Connection{
        private $servername="localhost";
        private $username="root";
        private $password="";
        private $dbname="tlccontact";
        public function connect(){  
            try{
                $conn = new PDO("mysql:host=$this->servername;dbname=$this->dbname",$this->username,$this->password);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                // echo 'connected successfully';
                return $conn;
            }catch(PDOException $e){
                echo 'Connection Failed'.$e->getMessage();
            }
        }
    }
?>