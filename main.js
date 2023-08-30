class ProducManager{
    constructor(){
        this.producto = [];
    }

    static id = 0

    addProducto(titulo, descripcion , precio , img , codigo , stock ){

        for(let i = 0 ; i < this.producto.length;i++){

            if(this.producto[i].codigo === codigo){
                console.log(`Eror El codigo ${codigo} esta Duplicado `);
                break;
            }
        }

        const newProduct = {
            titulo,
            descripcion, 
            precio, 
            img, 
            codigo, 
            stock
        }

        if (!Object.values(newProduct).includes(undefined)){

            ProducManager.id++;
            this.producto.push({
                ...newProduct, 
                id: ProducManager.id,
            });
        }else{
            console.log('Error , Todos los campos son Obligatorio')
        }

    }


    getProducto(){
        return this.producto;
    }

    existe (id){
        return this.producto.find((product) => product.id === id);
    }

    getProductoById(id){
        !this.existe(id) ? console.log('Not Found') : console.log(this.existe(id));
    }

}


const productos = new ProducManager
// arreglo vacio
console.log (productos.getProducto());

// Agregar productos

productos.addProducto('Mango', 'Fruta', 150 , 'img1', 'abc123' , 5 );
productos.addProducto('Coco', 'Fruta', 250 , 'img2', 'abc124',6 );


console.log (productos.getProducto())

//Codigo repetido
productos.addProducto('Limon', 'Fruta', 50 , 'img3', 'abc124' , 8 );

// BUSSCAR Id TRUE

productos.getProductoById(1)

// BUSSCAR Id FALSE

productos.getProductoById(3)

// Todos los campos son Obligatorios

productos.addProducto('Pera', 'Fruta', 25 , 'img4', 'abc126');

