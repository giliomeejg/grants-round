import { useLocation, useNavigate } from "react-router-dom"
import "react-datetime/css/react-datetime.css"
import { XIcon } from "@heroicons/react/solid"

import { useWeb3 } from "../common/ProtectedRoute"
import { useListProgramsQuery } from "../api/services/program"
import { FormWizard } from "../common/FormWizard"
import { RoundDetailForm } from "./RoundDetailForm"
import { RoundApplicationForm } from "./RoundApplicationForm"
import { Button } from "../common/styles"


export default function CreateRound() {
  const { account } = useWeb3()
  const search = useLocation().search
  const programId = (new URLSearchParams(search)).get("programId")

  const { program, isSuccess: isProgramFetched } = useListProgramsQuery(account, {
    selectFromResult: ({ data, isSuccess }) => ({
      program: data?.find((program) => program.id === programId),
      isSuccess
    })
  })

  const navigate = useNavigate()

  return (
    <div className="container mx-auto h-screen px-4 py-16">
      <header>
        <div className="flow-root">
          <h1 className="float-left text-[32px] mb-7">Create Round</h1>
          <Button 
          type="button" 
          $variant="outline" 
          className="inline-flex float-right py-2 px-4 text-sm text-grey-400"
          onClick={() => navigate(`/program/${programId}`)}>
            <XIcon className="h-5 w-5 mr-1" aria-hidden="true" />
            Exit
          </Button>
        </div>
      </header>
      <main>
        <FormWizard
          steps={[RoundDetailForm, RoundApplicationForm]}
          initialData={{ program, isProgramFetched, programId }}
        />

        {/* Display relevant status updates */}
        {/* {isSavingToIPFS && <p className="text-orange-500">⌛ Saving metadata in IPFS...</p>}
          {isSavedToIPFS && <p className="text-green-600">✅ Metadata saved to IPFS!</p>}
          {isLoading && <p className="text-orange-500">⌛ Deploying contract to Goerli + awaiting 1 confirmation...</p>}
          {isSuccess && <p className="text-green-600">✅ Congratulations! your round was successfully created!</p>}
          {(isIPFSError || isRoundError) && <p className="text-rose-600">Error: {JSON.stringify(ipfsError || roundError)}!</p>} */}
      </main>
    </div >
  )
}