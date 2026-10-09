import useMacbookStore from "../store";
import clsx from "clsx";
import {Canvas} from "@react-three/fiber";
import {Box, OrbitControls} from "@react-three/drei";
import MacbookModel14 from "./models/Macbook-14.jsx";
import { useEffect, useState } from "react";
import { getProduct, formatPrice } from "../api";
import { useCartStore } from "../store/cartStore";

import StudioLights from "./three/StudioLights.jsx";
import ModelSwitcher from './three/ModelSwitcher.jsx'
import {useMediaQuery} from "react-responsive";

const ProductViewer = () => {
    const { color, scale, setColor, setScale } = useMacbookStore();

    const isMobile = useMediaQuery({ query: '(max-width: 1024px)'});

        // product data from the API
    const [product, setProduct] = useState(null);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        getProduct("macbook-pro")
            .then(setProduct)
            .catch((err) => setLoadError(err.message));
    }, []);

    // the 3D model uses scale for size: 0.06 = 14", 0.08 = 16"
    const sizeLabel = scale === 0.06 ? '14"' : '16"';
    const variant = product?.variants.find(
        (v) => v.colorHex.toLowerCase() === color.toLowerCase() && v.size === sizeLabel
    );

    const addItem = useCartStore((s) => s.addItem);
    const [added, setAdded] = useState(false);

    const handleAddToBag = () => {
        addItem({
            variantId: variant.id,
            sku: variant.sku,
            name: product.name,
            colorName: variant.colorName,
            size: variant.size,
            priceCents: variant.priceCents,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <section id="product-viewer">
            <h2>Take a closer look.</h2>

            <div className="controls">
                {/*<p className="info">Macbook Pro | Available in 14" & 16" in Space Gray & Dark colors</p>*/}

                <div className="col-center gap-3">
    <p className="text-white text-lg font-semibold">
        {loadError
            ? "Couldn't load price"
            : !variant
                ? "Loading price…"
                : variant.inStock
                    ? formatPrice(variant.priceCents)
                    : "Sold out"}
    </p>
    <button
        onClick={handleAddToBag}
        disabled={!variant || !variant.inStock}
        className="bg-primary text-white px-6 py-2 rounded-full font-semibold cursor-pointer hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
    >
        {added ? "Added ✓" : "Add to Bag"}
    </button>
</div>

                <div className="flex-center gap-5 mt-5">
                    <div className="color-control">
                        <div
                            onClick={() => setColor('#adb5bd')}
                            className={clsx('bg-neutral-300', color === '#adb5bd' && 'active')}
                        />
                        <div
                            onClick={() => setColor('#2e2c2e')}
                            className={clsx('bg-neutral-900', color === '#2e2c2e' && 'active')}
                        />
                    </div>

                    <div className="size-control">
                        <div
                            onClick={() => setScale(0.06)}
                            className={clsx(scale === 0.06 ? 'bg-white text-black' : 'bg-transparent text-white')}
                        >
                            <p>14"</p>
                        </div>
                        <div
                            onClick={() => setScale(0.08)}
                            className={clsx(scale === 0.08 ? 'bg-white text-black' : 'bg-transparent text-white')}
                        >
                            <p>16"</p>
                        </div>
                    </div>
                </div>
            </div>

            <Canvas id="canvas" camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100}}>
                <StudioLights />

                <ModelSwitcher scale={isMobile ? scale - 0.03 : scale} isMobile={isMobile} />
            </Canvas>
        </section>
    )
}
export default ProductViewer
