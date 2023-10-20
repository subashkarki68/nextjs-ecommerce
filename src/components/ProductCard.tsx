import { Product } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./PriceTag";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}
export default function ProductCard({ product }: ProductCardProps) {
  const isNew = (days: number) =>
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * days;
  return (
    <Link
      href={`/products/${product.id}`}
      className="card w-full bg-base-100 hover:shadow-xl transition-shadow"
    >
      <div className="card-body">
        <figure>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={800}
            height={400}
            className="h-48 object-cover"
          />
        </figure>
        <h2 className="card-title">{product.name}</h2>
        {isNew(7) && <div className="badge badge-secondary">NEW</div>}
        <p>{product.description}</p>
        <PriceTag price={product.price} />
      </div>
    </Link>
  );
}
