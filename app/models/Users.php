<?php
    require_once '../app/models/Connection.php';
    class Users extends Connection{
        public function fetch(){
            
            $conn = $this->connect();
            $stm = $conn->prepare('SELECT *FROM user');
            $stm->execute();
            return $stm;

        }

        public function create($Firstname,$Lastname,$Dobirth,$Nationality,$Fstatus,$Address,$Vtype,$Dodeparture,$Doarrival,$Tdtype,$Tdnumber){

            $conn = $this->connect();
            $stm = $conn->prepare('INSERT INTO `user` (`Firstname`,`Lastname`,`dateofbirth`, `nationality`, `familystatus`, `address`, `visatype`,
            `Dateofdeparture`, `Dateofarrival`, `traveldocumenttype`, `traveldocumentnumber`, `Referencenumber`) 
            VALUES ( :Fn , :Ln, :dobirth , :nationality , :fstatus , :address , :vtype , :dodeparture , :doarrival , :tdtype , :tdnumber , :rnumber )');
            $stm->BindParam(':Fn',$Firstname);
            $stm->BindParam(':Ln',$Lastname);
            $stm->BindParam(':dobirth',$Dobirth);
            $stm->BindParam(':nationality',$Nationality);
            $stm->BindParam(':fstatus',$Fstatus);
            $stm->BindParam(':address',$Address);
            $stm->BindParam(':vtype',$Vtype);
            $stm->BindParam(':dodeparture',$Dodeparture);
            $stm->BindParam(':doarrival',$Doarrival);
            $stm->BindParam(':tdtype',$Tdtype);
            $stm->BindParam(':tdnumber',$Tdnumber);
            $Rnumber = uniqid('M');
            $stm->BindParam(':rnumber',$Rnumber);
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
        public function validate($ddr){
            $conn = $this->connect();
            $stm = $conn->prepare(" SELECT * FROM `reservation` WHERE datedereservation = :ddr ");
            $stm->BindParam(':ddr',$ddr);
            $stm->execute();
            $stm->fetch();
            $num = $stm->rowCount();
            return $num;
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