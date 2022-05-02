var fields = document.querySelectorAll('.textb input');
var btn = document.querySelector('.btn');

function check() {
    if( (fields[0].value != '') && (fields[1].value != '') && (fields[2].value != '') && (fields[3].value != '')) { //input 박스 둘 다 비어있지 않을 경우 
        btn.disabled = false;                                  //빨간색
    } else {
        btn.disabled = true;                                   //흰색
    }
}

fields[0].addEventListener('keyup', check);
fields[1].addEventListener('keyup', check);
fields[2].addEventListener('keyup', check);
fields[3].addEventListener('keyup', check);

document.querySelector('.show-password').addEventListener('click', function(){
    if( this.classList[2] == 'fa-eye-slash' ) {
        this.classList.remove('fa-eye-slash');
        this.classList.add('fa-eye');
        fields[1].type = "text";
    } else {
        this.classList.remove('fa-eye');
        this.classList.add('fa-eye-slash');
        fields[1].type = "password";
    }
});