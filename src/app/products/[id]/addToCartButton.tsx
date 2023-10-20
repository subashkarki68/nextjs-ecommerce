"use client";

import { useState, useTransition } from "react";

interface AddtoClientButtonProps {
  productId: string;
  incrementProductQuantity: (productId: string) => Promise<void>;
}

export default function AddToCartButton({
  productId,
  incrementProductQuantity,
}: AddtoClientButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap2">
      <button
        className="btn btn-primary"
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementProductQuantity(productId);
            setSuccess(true);
          });
        }}
      >
        Add to Cart
        <svg
          fill="#000000"
          width="28px"
          height="28px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19,14a1,1,0,0,0,.949-.684l2-6A1,1,0,0,0,21,6H7V2A1,1,0,0,0,6,1H3A1,1,0,0,0,3,3H5V17a1,1,0,0,0,1,1H18a1,1,0,0,0,0-2H7V14ZM7,8H19.613l-1.334,4H7ZM6.5,19A1.5,1.5,0,1,1,5,20.5,1.5,1.5,0,0,1,6.5,19Zm10,0A1.5,1.5,0,1,1,15,20.5,1.5,1.5,0,0,1,16.5,19Z" />
        </svg>
      </button>
      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && (
        <span className="text-success">Added To Cart</span>
      )}
    </div>
  );
}
