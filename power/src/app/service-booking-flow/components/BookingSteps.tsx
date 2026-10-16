interface BookingStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

interface BookingStepsProps {
  currentStep: number;
}

const BookingSteps = ({ currentStep }: BookingStepsProps) => {
  const steps: BookingStep[] = [
    {
      id: 1,
      title: "Service Details",
      description: "Tell us what you need",
      isCompleted: currentStep > 1,
      isActive: currentStep === 1
    },
    {
      id: 2,
      title: "Select Provider",
      description: "Choose your professional",
      isCompleted: currentStep > 2,
      isActive: currentStep === 2
    },
    {
      id: 3,
      title: "Schedule & Details",
      description: "Pick date and time",
      isCompleted: currentStep > 3,
      isActive: currentStep === 3
    },
    {
      id: 4,
      title: "Payment",
      description: "Secure checkout",
      isCompleted: currentStep > 4,
      isActive: currentStep === 4
    },
    {
      id: 5,
      title: "Confirmation",
      description: "Booking complete",
      isCompleted: currentStep > 5,
      isActive: currentStep === 5
    }
  ];

  return (
    <div className="w-full bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  step.isCompleted
                    ? 'bg-success text-success-foreground'
                    : step.isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step.isCompleted ? '✓' : step.id}
              </div>
              <div className="mt-2 text-center">
                <div className={`text-sm font-medium ${step.isActive ? 'text-primary' : 'text-text-secondary'}`}>
                  {step.title}
                </div>
                <div className="text-xs text-muted-foreground hidden sm:block">
                  {step.description}
                </div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                  step.isCompleted ? 'bg-success' : 'bg-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingSteps;