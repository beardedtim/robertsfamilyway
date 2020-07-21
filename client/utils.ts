/**
 * Returns the needed values to pass to the view layer in 
 * order to request this CSS asset.
 * 
 * @param name The name that identifies the asset we want
 */
export const css_asset = (name: string) => `/assets/css/${name}.css`

/**
 * Returns the needed values to pass to the view layer in
 * order to request this JS asset.
 * 
 * @param name The name that identifies this asset
 * @param preload If we want to preload this asset
 * @param module If we want to treat this asset as a module
 */
export const js_asset = (name: string, preload = false, is_module = false) => ({
  src: `/assets/js/${name}.js`,
  preload,
  is_module
})

export const img_asset = (name: string, type = 'jpg') => `/assets/img/${name}.${type}`