import * as bcrypt from 'bcrypt';

interface SeedProduct {
    description: string;
    images: string;
    stock: number;
    price: number;
    sizes: string;
    slug: string;
    tags: string;
    title: string;
    type: ValidTypes;
    gender: 'men'|'women'|'kid'|'unisex'
}

type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats';

interface SeedUser {
    email:    string;
    fullName: string;
    password: string;
    rol:     string|string[];
}


interface SeedData {
    users: SeedUser[];
    products: SeedProduct[];
}


export const initialData: SeedData = {

    users: [
        {
            email: 'omar777g@hotmail.com',
            fullName: 'Test One',
            password: bcrypt.hashSync( 'Oma.2017*', 10 ),
            rol: 'admin'
        },
        {
            email: 'test2@google.com',
            fullName: 'Test Two',
            password: bcrypt.hashSync( '123456', 10 ),
            rol: 'user'
        }
    ],

    products: [
        {
            description: "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
            images: '1740176-00-A_0_2000.jpg,1740176-00-A_1.jpg',
            stock: 7,
            price: 75,
            sizes: 'XS,S,M,L,XL,XXL',
            slug: "mens_chill_crew_neck_sweatshirt",
            type: 'shirts',
            tags: 'sweatshirt',
            title: "Men’s Chill Crew Neck Sweatshirt",
            gender: 'men'
        },
        {
            description: "The Men's Quilted Shirt Jacket features a uniquely fit, quilted design for warmth and mobility in cold weather seasons. With an overall street-smart aesthetic, the jacket features subtle silicone injected Tesla logos below the back collar and on the right sleeve, as well as custom matte metal zipper pulls. Made from 87% nylon and 13% polyurethane.",
            images: '1740507-00-A_0_2000.jpg,1740507-00-A_1.jpg',
            stock: 5,
            price: 200,
            sizes: 'XS,S,M,XL,XXL',
            slug: "men_quilted_shirt_jacket",
            type: 'shirts',
            tags: 'jacket',
            title: "Men's Quilted Shirt Jacket",
            gender: 'men'
        },
        
        {
            description: "Introducing the Tesla Raven Collection. The Men's Raven Lightweight Zip Up Bomber has a premium, modern silhouette made from a sustainable bamboo cotton blend for versatility in any season. The hoodie features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, a concealed chest pocket with custom matte zipper pulls and a french terry interior. Made from 70% bamboo and 30% cotton.",
            images: '1740250-00-A_0_2000.jpg,1740250-00-A_1.jpg',
            stock: 10,
            price: 130,
            sizes: 'S,M,L,XL,XXL',
            slug: "men_raven_lightweight_zip_up_bomber_jacket",
            type: 'shirts',
            tags: 'shirt',
            title: "Men's Raven Lightweight Zip Up Bomber Jacket",
            gender: 'men'
        },

        {
            description: "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Long Sleeve Tee features a subtle, water-based T logo on the left chest and our Tesla wordmark below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
            images:'1740280-00-A_0_2000.jpg,1740280-00-A_1.jpg',
            stock: 50,
            price: 45,
            sizes: 'XS,S,M,L',
            slug: "men_turbine_long_sleeve_tee",
            type: 'shirts',
            tags: 'shirt',
            title: "Men's Turbine Long Sleeve Tee",
            gender: 'men'
        },
        {
            description: "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Short Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
            images:'1741416-00-A_0_2000.jpg,1741416-00-A_1.jpg',
            stock: 50,
            price: 40,
            sizes: 'M,L,XL,XXL',
            slug: "men_turbine_short_sleeve_tee",
            type: 'shirts',
            tags: 'shirt',
            title: "Men's Turbine Short Sleeve Tee",
            gender: 'men'
        },
        {
            description: "Designed for comfort, the Cybertruck Owl Tee is made from 100% cotton and features our signature Cybertruck icon on the back.",
            images: '7654393-00-A_2_2000.jpg,7654393-00-A_3.jpg',
            stock: 0,
            price: 35,
            sizes: 'M,L,X,XXL',
            slug: "men_cybertruck_owl_tee",
            type: 'shirts',
            tags: 'shirt',
            title: "Men's Cybertruck Owl Tee",
            gender: 'men'
        }
    ]
}