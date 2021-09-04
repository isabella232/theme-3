import { Component, h, Element, Event, EventEmitter, Listen } from "@stencil/core";

export interface PackageFilter {
    kind: "type" | "category" | "status";
    label: string;
    value: string;
}

@Component({
    tag: "pulumi-filter-select",
    shadow: true,
    styles: `
        div {
            display: flex;
        }
    `,
})
export class FilterSelect {

    @Element()
    el: HTMLElement;

    @Event({ composed: true, bubbles: true })
    filterSelect: EventEmitter<any[]>; // Momentary laziness -- will come back to this.

    @Listen("optionChange")
    onOptionChange(event: Event) {
        event.stopPropagation();
        const options = Array.from(this.el.querySelectorAll("pulumi-filter-select-option"));

        const filters = options
            .filter(option => option.selected)
            .map(option => {
                const group = option.closest("pulumi-filter-select-option-group");
                return {
                    group: group.name,
                    value: option.value,
                }
            });

        this.filterSelect.emit(filters);
    }

    render() {
        return <div>
            <slot />
        </div>;
    }
}
