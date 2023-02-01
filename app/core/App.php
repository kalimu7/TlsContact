<?php
    class app{



        protected $controller = 'home';
        protected $method = 'index';
        protected $params  = [];


        public function __construct(){
            $url = $this -> parseUrl();
            // print_r($url);
            if(isset($url)){
                if(file_exists('../app/controllers/'. $url[0] .'.php')){
                    $this->controller = $url[0];
                    unset($url[0]);
                    }
            }
            
            require_once '../app/controllers/' . $this->controller . '.php';
            $this->controller = new $this->controller;
            
            if(isset($url[1])){
                if(method_exists($this->controller,$url[1])){
                    $this->method = $url[1];
                    unset($url[1]);
                }
            }

            
            $this->params = isset($url) ? array_values($url) : [] ;
            // print_r($this->params);
            call_user_func_array([$this->controller,$this->method],$this->params);
        }
        
        public function parseUrl(){
            if(isset($_GET['url'])){
                // echo 'link after public '. $_GET['url'];
                return $url = explode('/',$_GET['url']);
            }
        }
    }

?>