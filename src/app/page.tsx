import PriceTag from "@/components/PriceTag";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });
  const featuredProduct = products[0];
  return (
    <div>
      <div className="hero w-full">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <figure>
            <Image
              src={featuredProduct.imageUrl}
              alt={featuredProduct.name}
              width={800}
              height={400}
              className="w-full max-w-sm rounded-lg shadow-2xl"
            />
          </figure>
          <div>
            <h1 className="text-5xl font-bold">{featuredProduct.name}</h1>
            <PriceTag price={featuredProduct.price} className="mt-4" />
            <p className="py-6">{featuredProduct.description}</p>
            <Link
              href={`/products/${featuredProduct.id}`}
              className="btn btn-primary"
            >
              Check it out
            </Link>
          </div>
        </div>
      </div>
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.slice(1).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
        <ProductCard product={products[0]} />
      </div>
    </div>
  );
}
