import { verifier } from "./contract";

const verify2 = async () => {
  verifier.on("Verify1", async (cIndex) => {
    const numQualifiedVerifiers = await verifier.numQualifiedVerifiers();
    const challenge = await verifier.challenges(cIndex);
    if (challenge.numVerifiers >= numQualifiedVerifiers) {
      const proposedKey = Buffer.from("GET FROM YOUR DATABASE");
      await verifier.verify2(cIndex, proposedKey);
    }
  });
};

export default verify2;
