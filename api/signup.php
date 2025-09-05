<?php

    if (isset($_POST['submit'])) {
        $emailaddress = $_POST['Email'];
        $password = $_POST['password'];
        $Cpassword = $_POST['confirmpassword'];
        if(empty($emailaddress) || empty($password) || empty($Cpassword)) {
            header("Location: ../public/signup.html?msg=Please fill in all fields");
            exit;
        } 
        else{
            if ($password !== $Cpassword) {
                header("Location: ../public/signup.html?msg=Passwords do not match");
                exit;
            } else {
                header("Location: ../public/signup.html?msg=Signup successful!");
                exit;
            }
        }
    }

?>
