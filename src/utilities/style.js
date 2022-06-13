const lineColor = 'sky-400';
// const background = 'sky-400';
// const text = 'sky-400';
const container = 'gray-100';
const dropdown = 'gray-200';
const outline = 'sky-400';
const round = '-lg';
const inputLabel = 'gray-700';
const inputText = 'gray-500';

export default {
    form: {
        label: `text-xs font-medium pl-1 text-${inputLabel} `,
        input: `text-${inputText}`
    },
    multiselect: {
        component: function (fetched, tag) {
            return {
                clearIcon: '',
                multipleLabel: 'py-1 relative z-1 flex text-start h-full  left-1 top-0 pointer-events-none bg-transparent',
                container: `border-2 border-solid border-${container}  focus-within:border-${lineColor} relative mx-auto w-full flex items-center justify-start box-border cursor-pointer bg-white rounded${round} py-2 pl-2 pr-0 text-xs shadow-sm `,
                dropdown: !fetched ? 'hidden' : `max-h-64 absolute -left-px -right-px -bottom-1 transform translate-y-full border-2 pb-1 border-${dropdown} -mt-px overflow-y-auto z-30 bg-white flex flex-col rounded${round}`,
                dropdownTop: `-translate-y-full top-px bottom-auto rounded-${round}`,
                dropdownHidden: 'hidden',
                caret: tag ? 'hidden' : `px-3 bg-multiselect-caret bg-center bg-no-repeat w-2.5 h-4 box-content mr-3.5 relative opacity-40 flex-shrink-0 flex-grow-0 transition-transform transform pointer-events-none rounded${round} `,
                caretOpen: tag ? 'hidden' : 'rotate-180 pointer-events-auto',
                // tags: `pl-0 multiselect-tags`,
                tagsSearch: tag ? 'absolute outline-none inset-0 border-1 appearance-none  text-xs box-border w-full -ml-1.5' : `absolute outline-none inset-0 border-1 focus:ring-0 appearance-none text-xs box-border w-full rounded${round} ml-3`,
                tagsSearchWrapper: `inline-block relative mx-1 mb-1 flex-grow flex-shrink h-full outline-${outline} rounded${round}`,
                tagSearch: `w-full absolute inset-0 outline-${outline} appearance-none box-border border-0 text-xs bg-white rounded${round}`,
                search: `w-full absolute inset-0 outline-none focus:ring-0 appearance-none box-border border-0 text-xs bg-white rounded${round} pl-3.5`,
                noOptions: 'py-2 px-3 text-red-500 bg-white text-left',
                noResults: 'py-2 px-3 text-red-500 bg-white text-left',
                groupLabel: 'flex text-xs box-border items-center justify-start text-left py-3 px-3 font-medium bg-green-50 text-green-700 leading-normal cursor-pointer',
                groupLabelSelectedPointed: 'bg-green-100 hover:bg-green-50 text-green-700 ',
                groupLabelPointed: 'bg-green-100 text-green-700 ',
                groupLabelSelected: 'bg-green-50 text-green-700 ',
            };
        },
        // border border-dashed border-gray-200
        tagWrapper: `bg-sky-100 text-xs font-medium py-1 pl-2.5 pr-1 rounded-lg mr-1 mb-1 flex items-center whitespace-nowrap`,
        tagLabel: `text-${inputText}`,
        tagRemove: `multiselect-tag-remove text-${inputText}`,
        tagRemoveIcon: `multiselect-tag-remove-icon text-${inputText}`
    }
}
