import { useId, useState, useRef } from "react";
import { styled } from "styled-components";
import { Label } from "..";
import {
  FloatingFocusManager,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useTypeahead,
  useRole,
} from "@floating-ui/react";
import { Focus } from "../../global/styles/styles";

type Props = {
  label: React.ReactNode;
  buttonText?: string;
  options: string[];
};

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FakeButton = styled.div`
  border: 1px solid #326771;
  border-radius: 4px;
  background: #fff;
  padding: 0.5rem;
  position: relative;

  &:focus-visible {
    ${Focus}
  }

  &:hover {
    outline: inset 2px #28464b;
  }

  &:after {
    content: "";
    border-bottom: 2px solid #000;
    border-right: 2px solid #000;
    height: 0.5rem;
    width: 0.5rem;
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translate(0, -50%) rotate(45deg);
  }
`;

const List = styled.ul`
  border: 0.5px solid #000;
  list-style: none;
  padding: 0;
  background: #fff;
  margin: 0;

  &:focus-visible {
    outline: none;
  }
`;

const ListItem = styled.li`
  padding: 1rem;

  &:focus-visible {
    ${Focus}
  }

  &:hover {
    background: #326771;
    color: #fff;
  }
`;

export const Select = ({ label, buttonText = "Select...", options }: Props) => {
  // generate unique id
  const id = useId();

  // state to control open, currently active item, selected item
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // refs for list navigation and selection
  const listRef = useRef<Array<HTMLElement | null>>([]);
  const listContentRef = useRef(options);
  const isTypingRef = useRef(false);

  // floating-ui hooks
  // handles float
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });
  // open or close on mouse click
  const click = useClick(context, { event: "mousedown" });
  // close on escape
  const dismiss = useDismiss(context);
  // add aria roles
  const role = useRole(context, { role: "listbox" });
  // handles keyboard navigation & focus management
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });
  // handles typeahead
  const typeahead = useTypeahead(context, {
    listRef: listContentRef,
    activeIndex,
    selectedIndex,
    onMatch: isOpen ? setActiveIndex : setSelectedIndex,
    onTypingChange(isTyping) {
      isTypingRef.current = isTyping;
    },
  });
  // passes interactions into props
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [dismiss, role, listNav, typeahead, click]
  );

  // displayed name, either default or selected choice
  const setName = selectedIndex !== null ? options[selectedIndex] : undefined;
  // change handler
  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(false);
  };

  return (
    <SelectWrapper>
      <Label htmlFor={id}>{label}</Label>
      {/* make this a real button */}
      <FakeButton
        id={id}
        tabIndex={0}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {setName || buttonText}
      </FakeButton>
      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <List
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {options.map((value, i) => (
                <ListItem
                  key={value}
                  ref={(node) => {
                    listRef.current[i] = node;
                  }}
                  role="option"
                  tabIndex={i === activeIndex ? 0 : -1}
                  {...getItemProps({
                    onClick() {
                      handleSelect(i);
                    },
                    onKeyDown(e) {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSelect(i);
                      }
                      if (e.key === " " && !isTypingRef.current) {
                        e.preventDefault();
                        handleSelect(i);
                      }
                    },
                  })}
                >
                  {value}
                </ListItem>
              ))}
            </List>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </SelectWrapper>
  );
};
