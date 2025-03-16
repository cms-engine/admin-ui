"use client";

import { useEffect, useState } from "react";
import apiClient from "@/utils/axiosInstance";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
  TableContainer,
  Paper,
} from "@mui/material";
import { SearchResponse } from "@/types/searchResponse";
import { useTranslations } from "next-intl";

interface Brand {
  id: number;
  name: string;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const pageSize = 20; // Per your request

  useEffect(() => {
    setLoading(true);
    apiClient
      .post<SearchResponse<Brand>>("/brands/search", {
        page: page,
        size: pageSize,
        sorts: [],
        filters: [],
      })
      .then((response) => response.data)
      .then((responseData) => {
        setBrands(responseData.data);
        setTotalElements(responseData.totalElements);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page]);

  const totalPages = Math.ceil(totalElements / pageSize);
  const t = useTranslations();

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ my: 3 }}>
        {t("brandsManagement")}
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>{t("id")}</strong>
                </TableCell>
                <TableCell>
                  <strong>{t("name")}</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {brands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>{brand.id}</TableCell>
                  <TableCell>{brand.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
        <Button variant="contained" onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page <= 1}>
          {t("previous")}
        </Button>
        <Typography variant="body1">{t("pageOf", { page, totalPages })}</Typography>
        <Button
          variant="contained"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page >= totalPages}
        >
          {t("next")}
        </Button>
      </div>
    </Container>
  );
}
