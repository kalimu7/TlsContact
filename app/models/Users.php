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
        
        public function modifier($Firstname,$Lastname,$id,$Dobirth,$Nationality,$Fstatus,$Address,$Vtype,$Dodeparture,$Doarrival,$Tdtype,$Tdnumber){
            $conn = $this->connect();
            $stm = $conn->prepare('UPDATE `user` SET `Firstname` = :Fn ,`Lastname`= :Ln ,`dateofbirth`= :dobirth ,`nationality`= :nationality ,`familystatus`=  :fstatus ,`address`= :address, `visatype`= :vtype  ,`Dateofdeparture`= :dodeparture,`Dateofarrival`= :doarrival ,`traveldocumenttype`= :tdtype ,`traveldocumentnumber`= :tdnumber WHERE id    = :idd');
            $stm->BindParam(':Fn',$Firstname);
            $stm->BindParam(':Ln',$Lastname);
            $stm->BindParam(':idd',$id);
            $stm->BindParam(':dobirth',$Dobirth);
            $stm->BindParam(':nationality',$Nationality);
            $stm->BindParam(':fstatus',$Fstatus);
            $stm->BindParam(':address',$Address);
            $stm->BindParam(':vtype',$Vtype);
            $stm->BindParam(':dodeparture',$Dodeparture);
            $stm->BindParam(':doarrival',$Doarrival);
            $stm->BindParam(':tdtype',$Tdtype);
            $stm->BindParam(':tdnumber',$Tdnumber);
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
        public function validate($ddr,$ddt){
            $conn = $this->connect();
            $stm = $conn->prepare(" SELECT * FROM `reservation` WHERE datedereservation = :ddr And  time = :ddt ");
            $stm->BindParam(':ddr',$ddr);
            $stm->BindParam(':ddt',$ddt);
            $stm->execute();
            $stm->fetch();
            $num = $stm->rowCount();
            return $num;
        }
        public function book($Day,$Minit,$idU){
            
            $conn = $this->connect();
            $stm = $conn->prepare('INSERT INTO `reservation` (`datedereservation`,`iduser`,`time`) VALUES( :day , :iduser , :minit ) ');
            $stm->BindParam(':day',$Day);
            $stm->BindParam(':minit',$Minit);
            $stm->BindParam(':iduser',$idU);
            // $stm->BindParam(':ddt',$ddt);
            $check = $stm->execute();
            if($check){
                return 1;
            }
        }
        public function getmax(){
            $conn = $this->connect();
            $stm = $conn->prepare('SELECT MAX(id) FROM user');
            $stm->execute();
            $num = $stm->fetch();
            return $num['MAX(id)'];
        }
        public function fetchrefid($id){
            $conn = $this->connect();
            $stm = $conn->prepare('SELECT Referencenumber from user WHERE id = :id  ');
            $stm->BindParam(':id',$id);
            $stm->execute();
            $ref = $stm->fetch();
            return $ref['Referencenumber'];
        }
        public function readonly($reference){
            $conn = $this->connect();
            $stm = $conn->prepare('SELECT * from user WHERE Referencenumber = :ref  ');
            $stm->BindParam(':ref',$reference);
            $stm->execute();
            $row = $stm->fetch(PDO::FETCH_ASSOC);
            return $row;
            
        }
        public function alldates($dateday){
            $conn = $this->connect();
            $stm = $conn->prepare('SELECT  reservation.time from `reservation` WHERE reservation.datedereservation = :dataday ');
            $stm->BindParam(':dataday',$dateday);
            $stm->execute();
            return $stm;
        }
        public function checkReserve($iduser){
            $conn = $this->connect();
            $stm = $conn->prepare('SELECT   reservation.time,reservation.datedereservation from `reservation` WHERE reservation.iduser = :idU ');
            $stm->BindParam(':idU',$iduser);
            $stm->execute();
            $row = $stm->fetch(PDO::FETCH_ASSOC);
            return $row;
        }
        public function CheckRes($iduser){
            $conn = $this->connect();
            $stm = $conn->prepare('SELECT   * from `reservation` WHERE reservation.iduser = :idU ');
            $stm->BindParam(':idU',$iduser);
            $stm->execute();
            $row = $stm->fetch(PDO::FETCH_ASSOC);
            return $row;
        }
        public function Canceled($iduser){
            $conn = $this->connect();
            $stm = $conn->prepare('DELETE FROM `reservation` WHERE iduser = :idd ');
            $stm->BindParam(':idd',$iduser);
            $stm->execute();
            return true;
        }
        
    }

?>