export default function createTestProps(testID: string) {
  return {
    testID,
    accessibilityLabel: testID
  };
}
