import path from "path";
import { compile, acir_from_bytes } from "@noir-lang/noir_wasm";
import {
  setup_generic_prover_and_verifier,
  create_proof,
  verify_proof,
  create_proof_with_witness,
} from "@noir-lang/barretenberg/dest/client_proofs";
import {
  packed_witness_to_witness,
  serialise_public_inputs,
  compute_witnesses,
} from "@noir-lang/aztec_backend";

const main = async () => {
  const compiled_program = compile(
    path.resolve(__dirname, "../circuits/src/main.nr")
  );
  let acir = compiled_program.circuit;
  const abi = compiled_program.abi;

  abi.x = 1;
  abi.y = 2;
  let [prover, verifier] = await setup_generic_prover_and_verifier(acir);
};

main()
  .then((r) => console.log(r))
  .catch(console.log);
