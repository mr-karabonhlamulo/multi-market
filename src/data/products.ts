export interface Product {
    id: number;
    name: string;
    price: string;
    description: string;
    image: string;
    volume: string;
    type: string; // Eau de Parfum, Cologne, etc.
    stock: number;
    notes: {
        top: string;
        heart: string;
        base: string;
    };
    ingredients?: string;
}

export const products: Product[] = [
    {
        id: 1,
        name: 'Midnight Rose',
        price: 'R1,200',
        description: 'A deep, mysterious floral scent capturing the essence of the night. Perfect for evening wear and special occasions.',
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600',
        volume: '50ml',
        type: 'Eau de Parfum',
        stock: 25,
        notes: {
            top: 'Blackcurrant, Raspberry',
            heart: 'Rose Absolute, Jasmine',
            base: 'Vanilla, Musk, Cedarwood'
        },
        ingredients: 'Alcohol Denat, Parfum (Fragrance), Aqua (Water), Citronellol, Geraniol, Linalool.'
    },
    {
        id: 2,
        name: 'Golden Amber',
        price: 'R1,450',
        description: 'Warm, resinous notes mixed with sweet vanilla and musk. A timeless classic that exudes elegance and warmth.',
        image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&q=80&w=600',
        volume: '100ml',
        type: 'Eau de Parfum',
        stock: 12,
        notes: {
            top: 'Bergamot, Honey',
            heart: 'Amber, Labdanum',
            base: 'Vanilla, Tonka Bean, Patchouli'
        }
    },
    {
        id: 3,
        name: 'Oceanic Breeze',
        price: 'R950',
        description: 'A crisp, aquatic fragrance that invokes the spirit of the sea. Fresh, energetic, and undeniably masculine.',
        image: 'https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&q=80&w=600',
        volume: '50ml',
        type: 'Eau de Toilette',
        stock: 8,
        notes: {
            top: 'Sea Salt, Grapefruit',
            heart: 'Sage, Violet Leaf',
            base: 'Driftwood, Ambergris'
        }
    }
];
