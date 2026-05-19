import Image from "next/image";

export function Step1Visual() {
  return (
    <div className="absolute inset-0">
      <div className="pointer-events-none absolute top-[18%] right-0 w-[50%] opacity-50 blur-[0.5px]">
        <Image
          src="/images/how-it-works/step-1/voice.png"
          alt=""
          width={622}
          height={166}
          className="h-auto w-full"
        />
      </div>

      <div className="absolute top-1/2 left-[12%] flex -translate-y-1/2 items-center gap-[0.625em] text-[3.7cqw] leading-none">
        <Image
          src="/images/how-it-works/step-1/logo.svg"
          alt=""
          width={59}
          height={72}
          className="h-[4.5em] w-auto shrink-0"
        />
        <div className="border-mid-gray flex h-[3.5em] items-center rounded-[0.375em] border border-dashed bg-white px-[1.0625em]">
          <span className="text-text font-medium whitespace-nowrap">
            Create an opportunity in Odoo.
          </span>
          <span
            aria-hidden
            className="bg-text ml-[0.1875em] inline-block h-[1.125em] w-[0.125em]"
          />
        </div>
        <Image
          src="/images/how-it-works/step-1/cursor.svg"
          alt=""
          width={23}
          height={30}
          className="absolute top-[68%] right-[18%] h-[6.9cqw] w-auto"
        />
      </div>

      <div className="pointer-events-none absolute bottom-[12%] left-[12%] w-[60%] opacity-40 blur-[1px]">
        <Image
          src="/images/how-it-works/step-1/mail.png"
          alt=""
          width={745}
          height={295}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
