"use client";

import { ArrowRight, AudioRecord, Emojis, File } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { useStep } from "usehooks-ts";
import { useForm, Controller } from "react-hook-form";

type FormData = {
  decision: string;
};

const DecisionForm = () => {
  const [currentStep, helpers] = useStep(2);
  console.log("Current step:", currentStep);
  const { setStep } = helpers;

  const { control, handleSubmit, watch, reset } = useForm<FormData>({
    defaultValues: {
      decision: "",
    },
  });

  const onSubmit = (data: FormData) => {
    alert("Form submitted with data:" + JSON.stringify(data));
    if (currentStep === 1) {
      setStep(2);
    }
    reset();
    setStep(1);
  };

  const handleSteps = () => {
    if (currentStep === 1) {
      reset();
      setStep(2);
    }
  };

  const decisionValue = watch("decision");

  return (
    <div
      className={`min-h-[calc(100vh-104px)] flex flex-col items-center justify-center`}
    >
      <div className="w-full max-w-[800px] bg-[#FAF4FF] rounded-4xl shadow-[0px_0px_0px_4px_#F6F1F9] p-8">
        <div className="flex justify-center gap-2 mb-6 shrink-0">
          <Image
            src="/notes.png"
            alt="notes"
            width={48}
            height={48}
            className="size-12 object-cover object-center aspect-square"
          />

          <h1 className="text-3xl font-bold text-slate-950">
            Describe one decision you made today that reflects your personal
            values.
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6 p-4 bg-white rounded-2xl">
            <Controller
              name="decision"
              control={control}
              render={({ field }) => (
                <>
                  <textarea
                    {...field}
                    className="w-full h-[84px] p-4 border-none rounded-lg mb-6 focus:outline-none text-slate-950 text-base font-semibold resize-none scroll-none overflow-hidden placeholder:text-slate-950 placeholder:text-base placeholder:font-semibold"
                    placeholder="Write here"
                    value={field.value}
                  />
                </>
              )}
            />

            <div className="w-full flex justify-between">
              {/* icons */}
              <div className="flex shrink-0">
                <div className="p-2 cursor-pointer">
                  <File className="size-6 text-slate-600" />
                </div>
                <div className="p-2 cursor-pointer">
                  <Emojis className="size-6 text-slate-600" />
                </div>
                <div className="p-2 cursor-pointer">
                  <AudioRecord className="size-6 text-slate-600" />
                </div>
              </div>
              {/* button */}
              <Button
                className="shrink-0"
                size="lg"
                type={currentStep === 1 ? "button" : "submit"}
                disabled={!decisionValue}
                onClick={currentStep === 1 ? handleSteps : undefined}
              >
                {currentStep === 1 ? "Next" : "Submit"}

                <ArrowRight className="size-6" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DecisionForm;
