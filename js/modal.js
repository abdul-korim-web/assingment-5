const my_modal_1 = async (id) => {
  const response = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const data = await response?.json();
  const ModalData = data?.data;
  const modal_boxElement = document.getElementById("modal-box");
  const modalInfo = `
    <h2 class="text-[24px] font-[700] text-[#1F2937]">${ModalData?.title}</h2>
    <div class="mt-2 flex flex-wrap space-x-1 items-center">
        <span class="mt-2 flex justify-center items-center py-2 px-4 text-[12px] bg-[#00A96E] text-white rounded-[100px]">${ModalData?.status}</span>
        <span class="text-[14px] text-[#64748B]">. Opened by ${ModalData?.author}</span>
        <span class="text-[14px] text-[#64748B]">. ${new Date(ModalData?.createdAt).toLocaleString()}</span>
    </div>
    <div class="flex items-center space-x-1 mt-6">
    ${ModalData?.labels
  ?.map(
    (label) => `
    ${
      label == "help wanted"
        ? `<div class="flex items-center space-x-[2px] justify-center text-[#D97706] bg-[#FFF8DB] rounded-[100px] border border-[#FDE68A] px-3 py-2">
            <img class="w-[12px] h-[12px]" src="./images/Vector (2).png" alt="help wanted"/>
            <p class="text-[14px] font-[500]">${label}</p>
           </div>`
        : label == "enhancement"
        ? `<div class="flex items-center space-x-[2px] justify-center text-[#00A96E] bg-[#DEFCE8] rounded-[100px] border border-[#BBF7D0] px-3 py-2">
            <img class="w-[12px] h-[12px]" src="./images/Open-Status.png" alt="enhancement"/>
            <p class="text-[14px] font-[500]">${label}</p>
           </div>`
        : `<div class="flex items-center space-x-[2px] justify-center text-[#EF4444] bg-[#FEECEC] rounded-[100px] border border-[#FECACA] px-3 py-2">
            <img class="w-[12px] h-[12px]" src="./images/BugDroid.png" alt="bug"/>
            <p class="text-[14px] font-[500]">${label}</p>
           </div>`
    }
  `,
  )
  .join("")}
    </div>
    <p class="text-[16px] text-[#64748b] mt-6">${ModalData?.description}</p>
    <div class="flex bg-[#f8fafc] p-4 rounded-[8px] mt-6">
    <div class="w-1/2 ">
    <p class="text-[16px] text-[#64748b] ">Assignee:</p>
    <h2 class="text-[16px] text-[#1F2937] ">${ModalData?.author}</h2>

    </div>
    <div class="w-1/2 ">
    <p class="text-[16px] text-[#64748b] ">Priority:</p>
    <p class=" flex justify-center items-center w-[60px] h-[24px] px-3 py-2 ${ModalData?.priority == "high" ? "bg-[#FEECEC] text-[#EF4444]" : ModalData?.priority == "medium" ? "bg-[#FFF6D1] text-[#F59E0B]" : "bg-[#EEEFF2] text-[#9CA3AF]"} rounded-[100px] mt-1">${ModalData?.priority}</h2>

    </div>
    </div>
    <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn bg-[#4A00FF] text-white font-[600]">Close</button>
          </form>
        </div>
    `;
  modal_boxElement.innerHTML = modalInfo;
  const modal = document.getElementById("issueModal");
  modal.showModal();
};
