import { useState, useMemo, useRef, useCallback } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  ClickAwayListener,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MDTypography from "components/MDTypography";
import type { CatalogItem } from "services/api/itemsApi";
import { formatPriceWithCurrency } from "utils/formatPrice";
import useLocales from "shared/hooks/useLocales";

const MIN_SEARCH_LEN = 3;

function itemMatchesName(name: string, query: string) {
  const t = query.trim();
  if (t.length < MIN_SEARCH_LEN) return false;
  const n = name.toLowerCase();
  const words = t
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  return words.every((w) => n.includes(w));
}

type ItemSearchInputProps = {
  items: CatalogItem[];
  loading?: boolean;
  title: string;
  description: string;
  placeholder: string;
  noResultsText: string;
  isRTL: boolean;
  onSelectItem: (item: CatalogItem) => void;
};

export default function ItemSearchInput({
  items,
  loading = false,
  title,
  description,
  placeholder,
  noResultsText,
  isRTL,
  onSelectItem,
}: ItemSearchInputProps) {
  const { locale } = useLocales();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (query.trim().length < MIN_SEARCH_LEN) return [];
    return items.filter((it) => itemMatchesName(it.name, query));
  }, [items, query]);

  const showDropdown =
    open && query.trim().length >= MIN_SEARCH_LEN && !loading;

  const handleSelect = useCallback(
    (item: CatalogItem) => {
      onSelectItem(item);
      setQuery("");
      setOpen(false);
    },
    [onSelectItem],
  );

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box>
        <MDTypography
          variant="h5"
          fontWeight="bold"
          color="dark"
          mb={1}
          sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
        >
          {title}
        </MDTypography>
        <MDTypography
          variant="body2"
          color="text"
          sx={{ mb: 2, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
        >
          {description}
        </MDTypography>
        <Box ref={anchorRef} sx={{ position: "relative" }}>
          <TextField
            placeholder={placeholder}
            value={query}
            fullWidth
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            autoComplete="off"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {loading ? (
                    <CircularProgress size={22} />
                  ) : (
                    <SearchIcon sx={{ color: "text.secondary", fontSize: 22 }} />
                  )}
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "grey.50",
                "&.Mui-focused": {
                  bgcolor: "background.paper",
                  "& fieldset": {
                    borderColor: "primary.main",
                    borderWidth: 2,
                  },
                },
              },
            }}
          />
          {showDropdown && (
            <Paper
              elevation={8}
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "100%",
                mt: 0.5,
                maxHeight: 320,
                overflow: "auto",
                zIndex: (theme) => theme.zIndex.modal,
                direction: isRTL ? "rtl" : "ltr",
              }}
            >
              {filtered.length === 0 ? (
                <Box sx={{ px: 2, py: 2 }}>
                  <MDTypography variant="body2" color="text.secondary">
                    {noResultsText}
                  </MDTypography>
                </Box>
              ) : (
                <List dense disablePadding>
                  {filtered.map((item) => (
                    <ListItemButton
                      key={item.id}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSelect(item)}
                    >
                      <ListItemText
                        primary={item.name}
                        primaryTypographyProps={{
                          sx: { fontSize: "0.875rem", fontWeight: 500 },
                        }}
                        secondary={formatPriceWithCurrency(item.price, locale)}
                        secondaryTypographyProps={{
                          sx: { fontSize: "0.75rem" },
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              )}
            </Paper>
          )}
        </Box>
      </Box>
    </ClickAwayListener>
  );
}
