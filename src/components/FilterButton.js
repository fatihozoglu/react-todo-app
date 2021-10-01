import React from "react";

export default function FilterButton( props ) {
    return (
        <button type="button"
                className="filter-button"
                onClick={() => props.setFilter(props.name)}
        >
          <span>{ props.name }</span>
        </button>
    );
}