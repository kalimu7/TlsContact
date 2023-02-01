<?php
    require_once '../app/models/Connection.php';
    class Users extends Connection{
        public function fetch(){
            
            $conn = $this->connect();
            $stm = $conn->prepare('SELECT *FROM user');
            $stm->execute();
            return $stm;

        }

        public function create($Firstname,$Lastname){

            $conn = $this->connect();
            $stm = $conn->prepare('INSERT INTO `user` (`Firstname`,`Lastname`) VALUES ( :Fn , :Ln )');
            $stm->BindParam(':Fn',$Firstname);
            $stm->BindParam(':Ln',$Lastname);
            $stm->execute();
            return true;
        }
        
        public function modifier($Firstname,$Lastname,$id){
            $conn = $this->connect();
            $stm = $conn->prepare('UPDATE `user` SET `Firstname` = :Fn ,`Lastname`= :Ln WHERE id = :idd');
            $stm->BindParam(':Fn',$Firstname);
            $stm->BindParam(':Ln',$Lastname);
            $stm->BindParam(':idd',$id);
            $stm->execute();
            return true;
        }

        public function delete($id){
            $conn = $this->connect();
            $stm = $conn->prepare('DELETE FROM `user` WHERE id = :idd ');
            $stm->BindParam(':idd',$id);
            $stm->execute();
            return true;
        }
        public function book($ddr,$id){

            $conn = $this->connect();
            $stm = $conn->prepare('INSERT INTO `reservation` (`datedereservation`,`iduser`) VALUES( :ddr , :id ) ');
            $stm->BindParam(':ddr',$ddr);
            $stm->BindParam(':id',$id);
            $check = $stm->execute();
            if($check){
                return 1;
            }else{
                return 2;
            }
        }

    }

?>