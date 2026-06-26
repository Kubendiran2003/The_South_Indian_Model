import imgBridalElegance from '../assets/portfolio-bridal-elegance.png';
import imgGoldenSaree from '../assets/portfolio-golden-saree.png';
import imgTempleJewelry from '../assets/portfolio-temple-jewelry.png';
import imgClassicTraditional from '../assets/portfolio-classic-traditional.png';
import imgModernFusion from '../assets/portfolio-modern-fusion.png';
import imgRoyalBridal from '../assets/portfolio-royal-bridal.png';
import imgSilkSplendor from '../assets/portfolio-silk-splendor.png';
import imgGoldAdornments from '../assets/portfolio-gold-adornments.png';
import imgHeritageStyle from '../assets/portfolio-heritage-style.png';
import imgContemporaryGrace from '../assets/portfolio-contemporary-grace.png';
import imgBridalPortrait from '../assets/portfolio-bridal-portrait.png';
import imgStatementPieces from '../assets/portfolio-statement-pieces.png';

const portfolioData = [
  {
    id: 1,
    title: "Bridal Elegance",
    category: "bridal",
    image: imgBridalElegance,
    description: "Traditional South Indian bridal look"
  },
  {
    id: 2,
    title: "Golden Saree Draping",
    category: "saree",
    image: imgGoldenSaree,
    description: "Elegant Kanjeevaram silk saree"
  },
  {
    id: 3,
    title: "Temple Jewelry",
    category: "jewelry",
    image: imgTempleJewelry,
    description: "Traditional temple jewelry collection"
  },
  {
    id: 4,
    title: "Classic Traditional",
    category: "traditional",
    image: imgClassicTraditional,
    description: "Timeless traditional beauty"
  },
  {
    id: 5,
    title: "Modern Fusion",
    category: "modern",
    image: imgModernFusion,
    description: "Contemporary bridal fashion"
  },
  {
    id: 6,
    title: "Royal Bridal",
    category: "bridal",
    image: imgRoyalBridal,
    description: "Majestic bridal ensemble"
  },
  {
    id: 7,
    title: "Silk Splendor",
    category: "saree",
    image: imgSilkSplendor,
    description: "Luxurious silk saree collection"
  },
  {
    id: 8,
    title: "Gold Adornments",
    category: "jewelry",
    image: imgGoldAdornments,
    description: "Exquisite gold jewelry showcase"
  },
  {
    id: 9,
    title: "Heritage Style",
    category: "traditional",
    image: imgHeritageStyle,
    description: "Celebrating cultural heritage"
  },
  {
    id: 10,
    title: "Contemporary Grace",
    category: "modern",
    image: imgContemporaryGrace,
    description: "Modern traditional fusion"
  },
  {
    id: 11,
    title: "Bridal Portrait",
    category: "bridal",
    image: imgBridalPortrait,
    description: "Intimate bridal moments"
  },
  {
    id: 12,
    title: "Statement Pieces",
    category: "jewelry",
    image: imgStatementPieces,
    description: "Bold jewelry statements"
  }
];

export const categories = [
  { id: "all", label: "All" },
  { id: "bridal", label: "Bridal" },
  { id: "saree", label: "Saree" },
  { id: "jewelry", label: "Jewelry" },
  { id: "traditional", label: "Traditional" },
  { id: "modern", label: "Modern Traditional" }
];

export default portfolioData;
