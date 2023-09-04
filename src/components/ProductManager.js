
import { Console } from "console";
import {promises as fs} from "fs"

export default class ProducManager{
    constructor(){
        this.patch = "./productos.txt";
        this.products = []
    }

    static id = 0

    addProduct = async (titulo, descripcion , precio , img , codigo , stock)=> {

        ProducManager.id++

        const newProduct = {
            titulo,
            descripcion, 
            precio, 
            img, 
            codigo, 
            stock,
            id: ProducManager.id
        }

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products));
    }

    readProducts = async ()=> {
        let respuesta= await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return  console.log(respuesta2)
    }

    getProductoById = async (id) => {
        let respuesta3 = await this.readProducts()
        if (!respuesta3.find(product => product.id === id  )){
            console.log("Producto no encontrado")
        } else {
            console.log(respuesta3.find(product => product.id === id  ));
        }
        
    }

    deleteProductById = async (id)=>{
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("Producto Eliminado")
    }

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductById(id);
        let productOld = await this.readProducts();
        let ProductsModif = [ {...producto, id},...productOld];
        await fs.writeFile(this.patch, JSON.stringify(ProductsModif));
        //console.log("Producto Modificado")

    }

}

//const productos = new ProducManager ();

/*productos.addProduct('Mango', 'Fruta', 150 , 'img1', 'abc123' , 5 );
productos.addProduct('Coco', 'Fruta', 250 , 'img2', 'abc124',6 );
productos.addProduct('Fresa', 'Fruta', 60 , 'img3', 'abc125',52 );
productos.addProduct('Limon', 'Fruta', 20 , 'img4', 'abc126',16 );
productos.addProduct('Pera', 'Fruta', 50 , 'img5', 'abc127',61 );
productos.addProduct('Manzana', 'Fruta', 450 , 'img6', 'abc128',25 );
productos.addProduct('Uva', 'Fruta', 550 , 'img7', 'abc129',8 );
productos.addProduct('Guayaba', 'Fruta', 150 , 'img8', 'abc130',10 );
productos.addProduct('Naranja', 'Fruta', 350 , 'img9', 'abc131',9 );
productos.addProduct('Piña', 'Fruta', 650 , 'img10', 'abc132',10 );*/


//productos.getProducts()

//productos.getProductoById(2)

//productos.deleteProductById(2)

/*productos.updateProducts({
    titulo: 'Mango',     
    descripcion: 'Fruta',
    precio: 4150,
    img: 'img1',
    codigo: 'abc123',    
    stock: 5,
    id: 1
})*/
