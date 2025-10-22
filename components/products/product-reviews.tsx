'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, User as UserIcon } from 'lucide-react';
import { getProductReviewsAction, createReviewAction, Review } from '@/app/actions/reviews';
import { getCurrentUserAction } from '@/app/actions/auth';
import { toast } from 'sonner';
import Link from 'next/link';

interface ProductReviewsProps {
  productId: string;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    comment: '',
    qualification: 5,
  });

  useEffect(() => {
    loadReviews();
    checkAuth();
  }, [productId]);

  const checkAuth = async () => {
    const result = await getCurrentUserAction();
    setIsAuthenticated(result.success && !!result.data);
  };

  const loadReviews = async () => {
    setLoading(true);
    const result = await getProductReviewsAction(productId);
    if (result.success && result.data) {
      setReviews(result.data.data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para dejar una reseña');
      return;
    }

    if (formData.comment.trim().length < 10) {
      toast.error('La reseña debe tener al menos 10 caracteres');
      return;
    }

    setSubmitting(true);
    const result = await createReviewAction(productId, formData.comment, formData.qualification);
    
    if (result.success) {
      toast.success('¡Reseña publicada exitosamente!');
      setFormData({ comment: '', qualification: 5 });
      setShowForm(false);
      loadReviews();
    } else {
      toast.error(result.error || 'Error al publicar la reseña');
    }
    
    setSubmitting(false);
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.qualification, 0) / reviews.length
    : 0;

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Reseñas de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center my-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600">{reviews.length} reseñas</div>
            </div>

            <div className="flex-1">
              {!showForm && (
                isAuthenticated ? (
                  <Button onClick={() => setShowForm(true)} className="w-full" variant="outline">
                    Escribir una Reseña
                  </Button>
                ) : (
                  <Link href="/login">
                    <Button variant="outline">
                      Inicia Sesión para Reseñar
                    </Button>
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Review Form */}
          {showForm && (
            <form onSubmit={handleSubmit} className="border-t pt-6 space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Calificación *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData({ ...formData, qualification: rating })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          rating <= formData.qualification
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Tu Reseña * (mínimo 10 caracteres)
                </label>
                <textarea
                  required
                  minLength={10}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full min-h-[120px] rounded-md border border-gray-300 px-3 py-2 text-sm"
                  placeholder="Comparte tu experiencia con este producto..."
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={submitting}  variant="outline">
                  {submitting ? 'Publicando...' : 'Publicar Reseña'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  disabled={submitting}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Reviews List */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">
              Aún no hay reseñas para este producto. ¡Sé el primero en opinar!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review._id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <UserIcon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {review.user ? `${review.user.name} ${review.user.lastName}` : 'Usuario'}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.qualification
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mt-2">{review.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
