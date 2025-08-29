export interface ProductFormData {
  title: string;
  price: string;
  category: string;
  stock: string;
}

export interface AddProductModalProps {
  showModal: boolean;
  onClose: () => void;
}

export interface EditProductModalProps {
  showModal: boolean;
  onClose: () => void;

  selectedSingleRow: any;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}
