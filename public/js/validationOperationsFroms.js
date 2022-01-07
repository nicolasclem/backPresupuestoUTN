// validacion forms edit  desde JS

window.onload = function(){
    
    let form = document.querySelector('form')
    
    form.addEventListener('submit',function(e){
        
        let errorsEdit =[];

    let descriptionEdit = document.querySelector('.descriptionForm');
    let amountEdit = document.querySelector('.amountForm');
    let dateEdit= document.querySelector('.dateFrom')

    let msjDescrip = document.querySelector('.msjDescrip')
    let msjAmount = document.querySelector('.msjAmount')   
    let msjDate=document.querySelector('.msjDate')






    if(descriptionEdit.value== ""){
        
        descriptionEdit.classList.add('is-invalid');
        msjDescrip.innerHTML="El campo no puede estar vacio"
        errorsEdit.push(1);

    }else if (descriptionEdit.value.length < 4){
        descriptionEdit.classList.add('is-invalid');
        msjDescrip.innerHTML='El nombre debe tener minimo 4 caracteres'
        errorsEdit.push(1.2)
    }else{
        descriptionEdit.classList.remove('is-invalid');
        descriptionEdit.classList.add('is-valid');
        amountEdit.focus();  
        msjDescrip.innerHTML=''
    };

    if(amountEdit.value == ""){
        amountEdit.classList.add('is-invalid');
        msjAmount.innerHTML='El campo no puede estar vacio'
        errorsEdit.push(2)

  
    }else{
        
        amountEdit.classList.remove('is-invalid');
        amountEdit.classList.add('is-valid');
        dateEdit.focus();
        msjAmount.innerHTML=''
    };

    if(dateEdit.value == ""){
        dateEdit.classList.add('is-invalid');
        msjDate.innerHTML='Debe ingresar una fecha'
        errorsEdit.push(3)
    }else{
        dateEdit.classList.remove('is-invalid');
        dateEdit.classList.add('is-valid');
        msjDate.innerHTML=''
       
    };
    

    
    if(errorsEdit.length >0){
        e.preventDefault();
        
        
    }else{
        
        
        form.submit()
    }
    })
}
