import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import type {
  EditProductModalProps,
  ProductFormData,
} from "../../types/productTypes";
import { toast } from "react-toastify";
import { useUpdateProduct } from "../../hooks/useProducts";

const EditProductModal: React.FC<EditProductModalProps> = ({
  showModal,
  onClose,
  selectedSingleRow,
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    price: "",
    category: "",
    stock: "",
  });

  const { mutate: updateProduct, isPending } = useUpdateProduct();


  useEffect(() => {
    if (selectedSingleRow) {
      setFormData({
        title: selectedSingleRow.title,
        price: selectedSingleRow.price,
        category: selectedSingleRow.category,
        stock: selectedSingleRow.stock,
      });
    }
  }, [selectedSingleRow]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.price ||
      !formData.category ||
      !formData.stock
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    updateProduct(
      {
        id: selectedSingleRow.id,
        data: formData,
      },
      {
        onSuccess: () => {
          toast.success("Product updated successfully!");
          onClose();
          setFormData({
            title: "",
            price: "",
            category: "",
            stock: "",
          });
        },
        onError: () => {
          toast.error("Failed to update product");
        },
      }
    );
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-2xl w-full md:max-w-3xl p-4 sm:p-6 shadow-lg relative overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Edit Product</h2>
          <button className="text-4xl cursor-pointer" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-medium p-2 md:p-6">
            <div className="md:space-y-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#7D7D7D]">
                  Title <span className="text-[#FF0000] font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Product Title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block text-sm w-full border-[1.7px] border-[#D9D9D9] rounded-md p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7D7D7D]">
                  Price <span className="text-[#FF0000] font-bold">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Product Price"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full text-sm font-medium border-[1.7px] border-[#D9D9D9] rounded-md p-3"
                />
              </div>
            </div>

            <div className="md:space-y-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#7D7D7D]">
                  Category <span className="text-[#FF0000] font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="category"
                  placeholder="Enter Product Category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block text-sm w-full border-[1.7px] border-[#D9D9D9] rounded-md p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7D7D7D]">
                  Stock <span className="text-[#FF0000] font-bold">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter Product Stock"
                  name="stock"
                  required
                  value={formData.stock}
                  onChange={handleChange}
                  className="mt-1 block w-full text-sm font-medium border-[1.7px] border-[#D9D9D9] rounded-md p-3"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col px-2 sm:flex-row justify-end gap-3 sm:gap-4">
            <button
              onClick={onClose}
              disabled={isPending}
              type="button"
              className="px-9 py-3 text-sm rounded-md border border-[#D9D9D9] text-black font-medium hover:bg-[#f0f0f0]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-6 text-sm py-3 flex items-center justify-center rounded-md bg-[#122645] text-white font-semibold hover:bg-[#0f1f3a] disabled:bg-[#122645c5]"
            >
              Save Details {isPending && <Loading />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
