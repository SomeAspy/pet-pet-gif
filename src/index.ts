import { GifEncoder } from "@skyra/gifenc"
import { Canvas, createCanvas, Image, loadImage } from "canvas"
import { resolve } from "path"
import { buffer } from "stream/consumers"

const FRAMES = 10

const petGifCache: (Canvas | Image)[] = []

export default async (avatarURL:string|Buffer, options:{"resolution":number, "delay":number, "backgroundColor":string|null} = {"resolution":128, "delay":20, "backgroundColor":null} ) => {
    // Create GIF encoder
    const encoder = new GifEncoder(options.resolution, options.resolution)

    const outputStream = encoder.createReadStream();

    encoder.start()
    encoder.setRepeat(0)
    encoder.setDelay(options.delay)
    encoder.setTransparent(null)

    // Create canvas and its context
    const canvas = createCanvas(options.resolution, options.resolution)
    const ctx = canvas.getContext('2d')

    const avatar = await loadImage(avatarURL)

    // Loop and create each frame
    for (let i = 0; i < FRAMES; i++) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if (options.backgroundColor) {
            ctx.fillStyle = options.backgroundColor
            ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        const j = i < FRAMES / 2 ? i : FRAMES - i

        const width = 0.8 + j * 0.02
        const height = 0.8 - j * 0.05
        const offsetX = (1 - width) * 0.5 + 0.1
        const offsetY = (1 - height) - 0.08

        if (i == petGifCache.length) petGifCache.push(await loadImage(resolve(import.meta.dirname, `../img/pet${i.toString()}.gif`)))

        ctx.drawImage(avatar, options.resolution * offsetX, options.resolution * offsetY, options.resolution * width, options.resolution * height)
        ctx.drawImage(petGifCache[i]!, 0, 0, options.resolution, options.resolution)

        encoder.addFrame(ctx)
    }

    encoder.finish()
    return await buffer(outputStream)
}