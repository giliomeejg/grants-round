import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import StatusModal from "../../../components/rounds/StatusModal";
import { grantSteps as steps } from "../../../utils/steps";
import setupStore from "../../../store";
import { renderWrapped } from "../../../utils/test_utils";

describe("<StatusModal />", () => {
  const scenarios = [
    {
      error: false,
      currentStep: steps[0],
      icons: ["current", "waiting", "waiting", "waiting", "waiting"],
    },
    {
      error: false,
      currentStep: steps[1],
      icons: ["completed", "current", "waiting", "waiting", "waiting"],
    },
    {
      error: false,
      currentStep: steps[2],
      icons: ["completed", "completed", "current", "waiting", "waiting"],
    },

    // with errors

    {
      error: true,
      currentStep: steps[0],
      icons: ["error", "waiting", "waiting", "waiting", "waiting"],
    },
    {
      error: true,
      currentStep: steps[1],
      icons: ["completed", "error", "waiting", "waiting", "waiting"],
    },
    {
      error: true,
      currentStep: steps[2],
      icons: ["completed", "completed", "error", "waiting", "waiting"],
    },
  ];

  const scenarioName = (scenario: any, scenarioIndex: number) => {
    if (scenario.error) {
      return `With error on -  ${scenario.currentStep.name} (${scenarioIndex})`;
    }

    return `Without error -  ${scenario.currentStep.name} (${scenarioIndex})`;
  };

  const testName = (step: any, icon: any) =>
    `step ${step.name} should have icon ${icon}`;

  scenarios.forEach((scenario, scenarioIndex) => {
    describe(scenarioName(scenario, scenarioIndex), () => {
      beforeEach(() => {
        renderWrapped(
          <StatusModal
            open
            onClose={() => {}}
            currentStatus={scenario.currentStep.status}
            steps={steps}
            title="Test Modal Use case."
            error={
              scenario.error
                ? {
                    error: "test error",
                    step: scenario.currentStep.status,
                  }
                : undefined
            }
          />,
          setupStore()
        );
      });

      steps.forEach((step, index) => {
        test(testName(step, scenario.icons[index]), async () => {
          const stepElement = screen.getByTestId(`step-${step.name}`);
          const iconElement = stepElement.querySelector(".step-icon")!;
          const expectedIcon = scenario.icons[index];
          expect(
            iconElement.classList.contains(`step-icon-${expectedIcon}`)
          ).toEqual(true);
        });
      });
    });
  });
});
