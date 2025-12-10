export interface Review {
    username: string;
    comment: string;
    rating: number;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    brand: string;
    sku: string;
    averageRating?: number;
    totalReviews?: number;
    reviewsList?: Review[];
    rating?: number; // legacy from mock
    reviews?: number; // legacy from mock
    stock?: number;
    quantity?: number; // for cart
}

export const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Quantum Laptop Pro X',
        description: 'High-performance laptop suitable for gaming and professional work.',
        price: 1499.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAXuZQCq_3OU-YeNAQHoq6Rld8pTxZt1BBpl2jBJUcN1vioalqn5YRZ9Ffw4qBvvgTrGdyR5FGqcfy-q_vImjqpqabeSzAMe1bqlPjY0Z2XzADzAEyRm7YPgo3dyGnilX0Ygh6WCSewHevGcHxTbYhJ9Y8MT_Xz3lcUzoWZpKu0wkhFeGAfsuzSu92AULVxyX4hd_hVptxcCCmQcjzUY20Nxvhmz-JnOXqp3rb0psiA34Hjq1mWIoR5LeFWVKuFvwLleLq6dVTKNA8',
        category: 'Electronics',
        brand: 'Quantum Tech',
        rating: 4.8,
        reviews: 210,
        sku: 'QL-PRO-X'
    },
    {
        id: 2,
        name: 'ErgoFlex Office Chair',
        description: 'Designed for ultimate comfort and productivity, this chair features adjustable lumbar support.',
        price: 350.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDH7E6iz7cbXyS9skgUvGm6ukfNGD7udVMIixH7ZReX30iPiU_PxHuL0AHXEDvERpz7dzOsKiVnesYSHdBuX3ppyzfvWzmCKQFJwkS8U0CE5v6eqelkHrPlfJubDwa_n-cADG7n11_emXt6FF7Hq02DKA3OfpQ38hWFkQh_mMH6ZSFex8opbOpd4m0Yya1aTrcaNK0r8sciA4XOXjbr4624juhZxzbjAfaDkDog9KgUeMjwaQ7Hul3NicdS2eowJfLlJZJD2BDaIbHT',
        category: 'Furniture',
        brand: 'Apex Solutions',
        rating: 4.5,
        reviews: 85,
        sku: 'EF-CHAIR-01'
    },
    {
        id: 3,
        name: 'AcousticPro Headphones',
        description: 'Wireless noise-cancelling headphones with superior sound quality.',
        price: 199.99,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuvZD7c1Sc-ZhpUf3Zeh5Wgf0OWy0OoEf1lNVH9rTXoUSBWAiJEYQyduv8t6dAJIsW7lx4YEA9agmUuDckTZEwpvLjl3SjGTMuP61fMvzImst4VIM5oRSfGBKGJh0A71RvdjLZwDdRLstx60TDWsqK59Ci2i3yT-9eF4SbR7IC-JXP9PJhqkLfNmyJEeNr67e8EplS2TtpXS178djNKnlhYdjR29GSQIdwwFZMn_Qa1UKNFe1hNvikkGWKx8SHvueKQGFsoporrt1C',
        category: 'Electronics',
        brand: 'Nexus Corp',
        rating: 4.7,
        reviews: 320,
        sku: 'AP-HEAD-01'
    },
    {
        id: 4,
        name: 'SmartWrite Digital Notebook',
        description: 'A revolutionary digital notebook that feels like paper.',
        price: 75.50,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDq4f6obFm-sCR9f8bsnE4duvnlusPE5uVwfPhz48ocAWENt5-kEZHkqQ89K0Qyro0eFfL_3lM8elcBnG2s3UG7WzoOiCVaH5EL0djSDWBunAC4GqkepWu--zo88ZZ8wXPTlYJFDFiBwW5Rc1UrdTg0Vi0cSbwa_sTqhmM-LwoUmivCvKU2ggMqQqvdte5OT3t-vCorRkFexJFcvDPREFCFRmUU0iwZNi3XFP_AblP9g5BaFJeUF9cD1rxKKmgT6q9YehyMWfVHWAdZ',
        category: 'Office Supplies',
        brand: 'Innovate Inc.',
        rating: 4.2,
        reviews: 45,
        sku: 'SW-NOTE-01'
    },
    {
        id: 5,
        name: 'Minimalist Oak Desk',
        description: 'A sturdy and stylish wooden desk with ample drawer space.',
        price: 620.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFbViRle1AwWYLTSlKNZdfgUmu-b4pzr6gIusGgIBS6CBbV6XSWlunq_0wNJq-nRKVw3todXTgv3zhjvt2Wbk44BwYLwIpE2FwiHIT9G1D9_4ennpMxtQHAdYq66S8d5jjpSTMx5kQZrLON5i6OaV46Duu-B2JB1kUFFOIVr4M0aREDgzJ445pKwScFIer_23u7IDGUD9ys1YERiD73SzHGWnmVUaTEk0ZkvwHNZai40MSHJBrgQILQDpXXuLooXTKN1sddFBXU32R',
        category: 'Furniture',
        brand: 'Innovate Inc.',
        rating: 4.6,
        reviews: 150,
        sku: 'MO-DESK-01'
    },
    {
        id: 6,
        name: 'VisionMax 4K Monitor',
        description: 'Crystal clear 4K ultrawide monitor for immersive viewing.',
        price: 899.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_-5LUGLMGJHRBMj60omIzq_oDTanI2-K98ZdpGF5kTqORLL_7-cunqI_k7h3e60YJ1zVQw5EHF-MzvlSOp_ZCapOAe1YSzj-PeCqdeqlIfInRsH8f3pfeizIompS-zkGz7tlXc78M_QuZtarlsk-0ZH4D7abJdu5Fu8Ua7VPsK2Id6fDhJJwqPS0U_AWEQsvbPVS0SjBdVBAskcbMWWwVoi1AYfuYPhsvEv-VRsJmUMcGdBTgQODtYfgOgg0rt4bRzaEz1GVn17q8',
        category: 'Electronics',
        brand: 'Quantum Tech',
        rating: 4.9,
        reviews: 280,
        sku: 'VM-MON-4K'
    }
];
