export type Props = {
  publicKey: string
}

type ChangeTextType = { newText: string }

export default class SignPost implements IScript<Props> {
  init() {}

  spawn(host: Entity, props: Props, channel: IChannel) {
    const sign = new Entity()
    sign.setParent(host)

    sign.addComponent(new GLTFShape('cfcce08c-5b0d-4a23-b7b8-0bee57932e1e/models/QR_SciFi_Frame.glb'))
    sign.addComponent(new Transform({}))

    let url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${props.publicKey}`.toString()

    let QRTexture = new Texture(url)
    let QRMaterial = new Material()

    QRMaterial.roughness = 1
    QRMaterial.specularIntensity = 0
    QRMaterial.albedoTexture = QRTexture

    let QRPlane = new Entity()
    QRPlane.setParent(host)
    QRPlane.addComponent(new PlaneShape())
    QRPlane.addComponent(QRMaterial)
    QRPlane.addComponent(
      new Transform({
        position: new Vector3(0, 0.3, 0.015),
        rotation: Quaternion.Euler(0, 0, 0),
        scale: new Vector3(0.45, 0.45, 0.45),
      })
    )
  }
}
