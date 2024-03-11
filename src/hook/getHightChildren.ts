export async function getHightChildren(element: any) {
  try {
    return element.nativeEvent.layout.height + 10;
  } catch (e: any) {}
}
