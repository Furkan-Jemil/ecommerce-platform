/**
 * Utility to generate optimized ImageKit URLs using their URL-based transformation API.
 * Documentation: https://docs.imagekit.io/features/image-transformations
 */

const IMAGEKIT_URL_ENDPOINT = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

interface OptimizationOptions {
    width?: number;
    height?: number;
    quality?: number;
    blur?: number;
    crop?: 'maintain' | 'force' | 'at_least';
    format?: 'webp' | 'png' | 'jpg' | 'auto';
}

export const getOptimizedImageUrl = (url: string | null | undefined, options: OptimizationOptions = {}) => {
    if (!url) return "/placeholder-product.png";

    // If it's not an ImageKit URL, return as is
    if (!url.includes(IMAGEKIT_URL_ENDPOINT)) return url;

    const transformations: string[] = [];

    if (options.width) transformations.push(`w-${options.width}`);
    if (options.height) transformations.push(`h-${options.height}`);
    if (options.quality) transformations.push(`q-${options.quality}`);
    if (options.blur) transformations.push(`bl-${options.blur}`);

    // Default optimization: auto format and progressive jpeg
    transformations.push('f-auto');

    const trString = transformations.join(',');

    // Handle both path-based and query-based transformations
    // Using path-based (tr:...) which is preferred by ImageKit
    if (url.includes('?')) {
        return `${url}&tr=${trString}`;
    }

    // Inject transformation into the path
    // Format: [endpoint]/tr:[transformations]/[path]
    const relativePath = url.replace(IMAGEKIT_URL_ENDPOINT, '');
    return `${IMAGEKIT_URL_ENDPOINT}/tr:${trString}${relativePath}`;
};
