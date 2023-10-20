import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import FormSubmitButton from "@/components/FormSubmitButton";

export const metadata = {
  title: "Add Product - Flomazon",
};

async function addProduct(formData: FormData) {
  "use server";
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") ?? 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });
  redirect("/");
}

export default function AddProductPage() {
  return (
    <div>
      <h1 className="text-lg mb-3 font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          placeholder="Name"
          name="name"
          className="mb-3 w-full input input-bordered"
        />
        <textarea
          required
          placeholder="Description"
          name="description"
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          required
          placeholder="Image URL"
          name="imageUrl"
          type="url"
          className="mb-3 w-full input input-bordered"
        />
        <input
          required
          placeholder="Price"
          name="price"
          type="number"
          className="mb-3 w-full input input-bordered"
        />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
}