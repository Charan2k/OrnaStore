export interface JewelryItem {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  gender: 'Men' | 'Women' | 'Unisex';
  category: 'Ring' | 'Necklace' | 'Others';
  material: 'Gold' | 'Silver';
}
