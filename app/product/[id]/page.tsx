import { notFound } from 'next/navigation';
import { getProductByIdAction } from '@/app/actions/products';
import { ProductDetail } from '@/components/products/product-detail';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const result = await getProductByIdAction(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return <ProductDetail product={result.data.data} />;
}
